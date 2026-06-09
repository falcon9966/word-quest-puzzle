const path = require('node:path');
const crypto = require('node:crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const { db, initDatabase, importWordsFromText } = require('./db');
const { buildLevels, shuffle } = require('./wordService');

const app = express();
const tokens = new Map();
const port = process.env.PORT || 3000;

initDatabase();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/遊戲示意圖.png', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '遊戲示意圖.png'));
});

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    role: user.role,
    score: user.score,
    isFrozen: Boolean(user.is_frozen)
  };
}

function auth(optional = false) {
  return (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const userId = tokens.get(token);
    if (!userId) {
      if (optional) return next();
      return res.status(401).json({ message: '請先登入' });
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!user || user.is_frozen) return res.status(403).json({ message: '帳號已停用或不存在' });
    req.user = user;
    next();
  };
}

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: '需要管理員權限' });
  next();
}

function allWords() {
  return db.prepare('SELECT * FROM words ORDER BY book, unit, english').all();
}

function getSave(userId) {
  let save = db.prepare('SELECT * FROM player_saves WHERE user_id = ?').get(userId);
  if (!save) {
    db.prepare('INSERT INTO player_saves (user_id) VALUES (?)').run(userId);
    save = db.prepare('SELECT * FROM player_saves WHERE user_id = ?').get(userId);
  }
  return {
    unlockedLevel: save.unlocked_level,
    completedLevels: JSON.parse(save.completed_levels),
    attempts: JSON.parse(save.attempts),
    lastPlayedAt: save.last_played_at
  };
}

function levelWords(levelId) {
  const book = Math.floor((levelId - 1) / 10) + 1;
  const levelInBook = ((levelId - 1) % 10) + 1;
  const unitA = levelInBook * 2 - 1;
  const unitB = unitA + 1;
  return db.prepare(
    'SELECT * FROM words WHERE book = ? AND unit IN (?, ?) ORDER BY unit, english'
  ).all(book, unitA, unitB);
}

app.post('/api/register', async (req, res) => {
  const { username, password, nickname } = req.body;
  if (!username || !password || !nickname) return res.status(400).json({ message: '請完整填寫資料' });
  if (String(password).length < 4) return res.status(400).json({ message: '密碼至少 4 碼' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = db.prepare(
      'INSERT INTO users (username, password_hash, nickname) VALUES (?, ?, ?)'
    ).run(username.trim(), hash, nickname.trim());
    db.prepare('INSERT INTO player_saves (user_id) VALUES (?)').run(result.lastInsertRowid);
    res.json({ message: '註冊完成' });
  } catch (error) {
    res.status(409).json({ message: '帳號已存在' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !(await bcrypt.compare(password || '', user.password_hash))) {
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }
  if (user.is_frozen) return res.status(403).json({ message: '帳號已凍結' });

  const token = crypto.randomUUID();
  tokens.set(token, user.id);
  db.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
  res.json({ token, user: publicUser(user), save: user.role === 'player' ? getSave(user.id) : null });
});

app.post('/api/logout', auth(true), (req, res) => {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  tokens.delete(token);
  res.json({ message: '已登出' });
});

app.get('/api/me', auth(), (req, res) => {
  res.json({ user: publicUser(req.user), save: req.user.role === 'player' ? getSave(req.user.id) : null });
});

app.get('/api/levels', auth(true), (req, res) => {
  const levels = buildLevels(allWords()).map((level) => ({
    ...level,
    words: level.words.map((word) => ({ id: word.id, english: word.english, chinese: word.chinese }))
  }));
  const unlockedLevel = req.user?.role === 'player' ? getSave(req.user.id).unlockedLevel : 1;
  res.json({ levels, unlockedLevel });
});

app.get('/api/levels/:id', auth(true), (req, res) => {
  const levelId = Number(req.params.id);
  const words = levelWords(levelId);
  if (!words.length) return res.status(404).json({ message: '找不到關卡' });
  const unlockedLevel = req.user?.role === 'player' ? getSave(req.user.id).unlockedLevel : 1;
  if (req.user && req.user.role === 'player' && levelId > unlockedLevel) {
    return res.status(403).json({ message: '尚未解鎖此關卡' });
  }
  res.json({ words, questions: shuffle(words).map((word) => ({ id: word.id, prompt: word.chinese })) });
});

app.post('/api/answers', auth(true), (req, res) => {
  const { levelId, wordId, answer, mode = 'zh-to-en' } = req.body;
  const word = db.prepare('SELECT * FROM words WHERE id = ?').get(wordId);
  if (!word) return res.status(404).json({ message: '找不到題目' });

  const expected = mode === 'en-to-zh' ? word.chinese : word.english;
  const correct = String(answer || '').trim().toLowerCase() === String(expected).trim().toLowerCase();
  const points = correct ? 10 : 0;

  if (req.user?.role === 'player') {
    const save = getSave(req.user.id);
    const attempts = save.attempts.slice(-99);
    attempts.push({ levelId, wordId, answer, correct, expected, at: new Date().toISOString() });
    db.prepare('UPDATE users SET score = score + ? WHERE id = ?').run(points, req.user.id);
    db.prepare('UPDATE player_saves SET attempts = ?, last_played_at = CURRENT_TIMESTAMP WHERE user_id = ?')
      .run(JSON.stringify(attempts), req.user.id);
  }

  res.json({ correct, expected, points });
});

app.post('/api/levels/:id/complete', auth(), (req, res) => {
  if (req.user.role !== 'player') return res.status(403).json({ message: '只有玩家可保存進度' });
  const levelId = Number(req.params.id);
  const save = getSave(req.user.id);
  const completed = Array.from(new Set([...save.completedLevels, levelId])).sort((a, b) => a - b);
  const unlocked = Math.max(save.unlockedLevel, levelId + 1);
  db.prepare(
    'UPDATE player_saves SET unlocked_level = ?, completed_levels = ?, last_played_at = CURRENT_TIMESTAMP WHERE user_id = ?'
  ).run(unlocked, JSON.stringify(completed), req.user.id);
  res.json({ save: getSave(req.user.id) });
});

app.get('/api/profile', auth(), (req, res) => {
  res.json({ user: publicUser(db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)), save: getSave(req.user.id) });
});

app.get('/api/rankings', (req, res) => {
  const rows = db.prepare(
    "SELECT username, nickname, score FROM users WHERE role = 'player' AND is_frozen = 0 ORDER BY score DESC, id ASC LIMIT 50"
  ).all();
  res.json({ rankings: rows });
});

app.get('/api/admin/stats', auth(), adminOnly, (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  res.json({
    users: db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'player'").get().count,
    levels: buildLevels(allWords()).length,
    activeToday: db.prepare("SELECT COUNT(*) AS count FROM player_saves WHERE substr(last_played_at, 1, 10) = ?").get(today).count,
    words: db.prepare('SELECT COUNT(*) AS count FROM words').get().count
  });
});

app.get('/api/admin/words', auth(), adminOnly, (req, res) => {
  const { book, unit } = req.query;
  let sql = 'SELECT * FROM words WHERE 1 = 1';
  const params = [];
  if (book) { sql += ' AND book = ?'; params.push(Number(book)); }
  if (unit) { sql += ' AND unit = ?'; params.push(Number(unit)); }
  sql += ' ORDER BY book, unit, english';
  res.json({ words: db.prepare(sql).all(...params) });
});

app.post('/api/admin/words', auth(), adminOnly, (req, res) => {
  const { book, unit, english, chinese } = req.body;
  db.prepare('INSERT INTO words (book, unit, english, chinese) VALUES (?, ?, ?, ?)')
    .run(Number(book), Number(unit), english.trim().toLowerCase(), chinese.trim());
  res.json({ message: '已新增' });
});

app.put('/api/admin/words/:id', auth(), adminOnly, (req, res) => {
  const { book, unit, english, chinese } = req.body;
  db.prepare(
    'UPDATE words SET book = ?, unit = ?, english = ?, chinese = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(Number(book), Number(unit), english.trim().toLowerCase(), chinese.trim(), req.params.id);
  res.json({ message: '已更新' });
});

app.delete('/api/admin/words/:id', auth(), adminOnly, (req, res) => {
  db.prepare('DELETE FROM words WHERE id = ?').run(req.params.id);
  res.json({ message: '已刪除' });
});

app.post('/api/admin/import', auth(), adminOnly, (req, res) => {
  const text = req.body.text || '';
  const count = importWordsFromText(text);
  res.json({ message: `已匯入 ${count} 筆` });
});

app.get('/api/admin/users', auth(), adminOnly, (req, res) => {
  const q = `%${req.query.q || ''}%`;
  const users = db.prepare(
    "SELECT id, username, nickname, role, score, is_frozen, created_at, last_login_at FROM users WHERE username LIKE ? OR nickname LIKE ? ORDER BY id DESC"
  ).all(q, q);
  res.json({ users });
});

app.put('/api/admin/users/:id', auth(), adminOnly, (req, res) => {
  const { score, isFrozen } = req.body;
  db.prepare('UPDATE users SET score = COALESCE(?, score), is_frozen = COALESCE(?, is_frozen) WHERE id = ? AND role = ?')
    .run(score ?? null, typeof isFrozen === 'boolean' ? Number(isFrozen) : null, req.params.id, 'player');
  res.json({ message: '已更新帳號' });
});

app.delete('/api/admin/users/:id', auth(), adminOnly, (req, res) => {
  db.prepare("DELETE FROM users WHERE id = ? AND role = 'player'").run(req.params.id);
  res.json({ message: '已刪除帳號' });
});

app.listen(port, () => {
  console.log(`Word Quest running at http://localhost:${port}`);
});
