const path = require('node:path');
const crypto = require('node:crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const { db, initDatabase, importWordsFromText } = require('./db');
const { buildLevels, shuffle } = require('./wordService');

const app = express();
const tokens = new Map();
let ready = initDatabase();

app.use((req, res, next) => { ready.then(() => next()).catch(() => res.status(503).json({ message: '資料庫初始化中' })); });
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
    isFrozen: Boolean(user.is_frozen),
  };
}

function auth(optional = false) {
  return async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const userId = tokens.get(token);
    if (!userId) {
      if (optional) return next();
      return res.status(401).json({ message: '請先登入' });
    }
    const user = await db.get('SELECT * FROM users WHERE id = $1', [userId]);
    if (!user || user.is_frozen) return res.status(403).json({ message: '帳號已停用或不存在' });
    req.user = user;
    next();
  };
}

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: '需要管理員權限' });
  next();
}

async function allWords() {
  return db.all('SELECT * FROM words ORDER BY book, unit, english');
}

async function getSave(userId) {
  let save = await db.get('SELECT * FROM player_saves WHERE user_id = $1', [userId]);
  if (!save) {
    await db.run('INSERT INTO player_saves (user_id) VALUES ($1)', [userId]);
    save = await db.get('SELECT * FROM player_saves WHERE user_id = $1', [userId]);
  }
  return {
    unlockedLevel: save.unlocked_level,
    completedLevels: JSON.parse(save.completed_levels),
    attempts: JSON.parse(save.attempts),
    lastPlayedAt: save.last_played_at,
  };
}

async function levelWords(levelId) {
  const book = Math.floor((levelId - 1) / 10) + 1;
  const levelInBook = ((levelId - 1) % 10) + 1;
  const unitA = levelInBook * 2 - 1;
  const unitB = unitA + 1;
  return db.all(
    'SELECT * FROM words WHERE book = $1 AND unit IN ($2, $3) ORDER BY unit, english',
    [book, unitA, unitB]
  );
}

app.post('/api/register', async (req, res) => {
  const { username, password, nickname } = req.body;
  if (!username || !password || !nickname) return res.status(400).json({ message: '請完整填寫資料' });
  if (String(password).length < 4) return res.status(400).json({ message: '密碼至少 4 碼' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (username, password_hash, nickname) VALUES ($1, $2, $3) RETURNING id',
      [username.trim(), hash, nickname.trim()]
    );
    await db.run('INSERT INTO player_saves (user_id) VALUES ($1)', [result.rows[0].id]);
    res.json({ message: '註冊完成' });
  } catch (error) {
    res.status(409).json({ message: '帳號已存在' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE username = $1', [username]);
  if (!user || !(await bcrypt.compare(password || '', user.password_hash))) {
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }
  if (user.is_frozen) return res.status(403).json({ message: '帳號已凍結' });

  const token = crypto.randomUUID();
  tokens.set(token, user.id);
  await db.run('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
  res.json({ token, user: publicUser(user), save: user.role === 'player' ? await getSave(user.id) : null });
});

app.post('/api/logout', auth(true), (req, res) => {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  tokens.delete(token);
  res.json({ message: '已登出' });
});

app.get('/api/me', auth(), async (req, res) => {
  res.json({ user: publicUser(req.user), save: req.user.role === 'player' ? await getSave(req.user.id) : null });
});

app.get('/api/levels', auth(true), async (req, res) => {
  const levels = (await buildLevels(await allWords())).map((level) => ({
    ...level,
    words: level.words.map((word) => ({ id: word.id, english: word.english, chinese: word.chinese })),
  }));
  const unlockedLevel = req.user?.role === 'player' ? (await getSave(req.user.id)).unlockedLevel : 1;
  res.json({ levels, unlockedLevel });
});

app.get('/api/levels/:id', auth(true), async (req, res) => {
  const levelId = Number(req.params.id);
  const words = await levelWords(levelId);
  if (!words.length) return res.status(404).json({ message: '找不到關卡' });
  const unlockedLevel = req.user?.role === 'player' ? (await getSave(req.user.id)).unlockedLevel : 1;
  if (req.user && req.user.role === 'player' && levelId > unlockedLevel) {
    return res.status(403).json({ message: '尚未解鎖此關卡' });
  }
  res.json({ words, questions: shuffle(words).map((word) => ({ id: word.id, prompt: word.chinese })) });
});

app.post('/api/answers', auth(true), async (req, res) => {
  const { levelId, wordId, answer, mode = 'zh-to-en' } = req.body;
  const word = await db.get('SELECT * FROM words WHERE id = $1', [wordId]);
  if (!word) return res.status(404).json({ message: '找不到題目' });

  const expected = mode === 'en-to-zh' ? word.chinese : word.english;
  const correct = String(answer || '').trim().toLowerCase() === String(expected).trim().toLowerCase();
  const points = correct ? 10 : 0;

  if (req.user?.role === 'player') {
    const save = await getSave(req.user.id);
    const attempts = save.attempts.slice(-99);
    attempts.push({ levelId, wordId, answer, correct, expected, at: new Date().toISOString() });
    await db.run('UPDATE users SET score = score + $1 WHERE id = $2', [points, req.user.id]);
    await db.run(
      'UPDATE player_saves SET attempts = $1, last_played_at = CURRENT_TIMESTAMP WHERE user_id = $2',
      [JSON.stringify(attempts), req.user.id]
    );
  }

  res.json({ correct, expected, points });
});

app.post('/api/levels/:id/complete', auth(), async (req, res) => {
  if (req.user.role !== 'player') return res.status(403).json({ message: '只有玩家可保存進度' });
  const levelId = Number(req.params.id);
  const save = await getSave(req.user.id);
  const completed = Array.from(new Set([...save.completedLevels, levelId])).sort((a, b) => a - b);
  const unlocked = Math.max(save.unlockedLevel, levelId + 1);
  await db.run(
    'UPDATE player_saves SET unlocked_level = $1, completed_levels = $2, last_played_at = CURRENT_TIMESTAMP WHERE user_id = $3',
    [unlocked, JSON.stringify(completed), req.user.id]
  );
  res.json({ save: await getSave(req.user.id) });
});

app.get('/api/profile', auth(), async (req, res) => {
  const user = await db.get('SELECT * FROM users WHERE id = $1', [req.user.id]);
  res.json({ user: publicUser(user), save: await getSave(req.user.id) });
});

app.get('/api/rankings', async (req, res) => {
  const rankings = await db.all(
    "SELECT username, nickname, score FROM users WHERE role = 'player' AND is_frozen = FALSE ORDER BY score DESC, id ASC LIMIT 50"
  );
  res.json({ rankings });
});

app.get('/api/admin/stats', auth(), adminOnly, async (req, res) => {
  const users = await db.get("SELECT COUNT(*) AS count FROM users WHERE role = 'player'");
  const levels = (await buildLevels(await allWords())).length;
  const activeToday = await db.get(
    "SELECT COUNT(*) AS count FROM player_saves WHERE DATE(last_played_at) = CURRENT_DATE"
  );
  const words = await db.get('SELECT COUNT(*) AS count FROM words');
  res.json({ users: Number(users.count), levels, activeToday: Number(activeToday.count), words: Number(words.count) });
});

app.get('/api/admin/words', auth(), adminOnly, async (req, res) => {
  const { book, unit } = req.query;
  let sql = 'SELECT * FROM words WHERE 1 = 1';
  const params = [];
  if (book) { sql += ' AND book = $' + (params.length + 1); params.push(Number(book)); }
  if (unit) { sql += ' AND unit = $' + (params.length + 1); params.push(Number(unit)); }
  sql += ' ORDER BY book, unit, english';
  const words = await db.all(sql, params);
  res.json({ words });
});

app.post('/api/admin/words', auth(), adminOnly, async (req, res) => {
  const { book, unit, english, chinese } = req.body;
  await db.run(
    'INSERT INTO words (book, unit, english, chinese) VALUES ($1, $2, $3, $4)',
    [Number(book), Number(unit), english.trim().toLowerCase(), chinese.trim()]
  );
  res.json({ message: '已新增' });
});

app.put('/api/admin/words/:id', auth(), adminOnly, async (req, res) => {
  const { book, unit, english, chinese } = req.body;
  await db.run(
    'UPDATE words SET book = $1, unit = $2, english = $3, chinese = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5',
    [Number(book), Number(unit), english.trim().toLowerCase(), chinese.trim(), req.params.id]
  );
  res.json({ message: '已更新' });
});

app.delete('/api/admin/words/:id', auth(), adminOnly, async (req, res) => {
  await db.run('DELETE FROM words WHERE id = $1', [req.params.id]);
  res.json({ message: '已刪除' });
});

app.post('/api/admin/import', auth(), adminOnly, async (req, res) => {
  const text = req.body.text || '';
  const count = await importWordsFromText(text);
  res.json({ message: `已匯入 ${count} 筆` });
});

app.get('/api/admin/users', auth(), adminOnly, async (req, res) => {
  const q = `%${req.query.q || ''}%`;
  const users = await db.all(
    "SELECT id, username, nickname, role, score, is_frozen, created_at, last_login_at FROM users WHERE username LIKE $1 OR nickname LIKE $1 ORDER BY id DESC",
    [q]
  );
  res.json({ users });
});

app.put('/api/admin/users/:id', auth(), adminOnly, async (req, res) => {
  const { score, isFrozen } = req.body;
  await db.run(
    'UPDATE users SET score = COALESCE($1, score), is_frozen = COALESCE($2, is_frozen) WHERE id = $3 AND role = $4',
    [score ?? null, typeof isFrozen === 'boolean' ? isFrozen : null, req.params.id, 'player']
  );
  res.json({ message: '已更新帳號' });
});

app.delete('/api/admin/users/:id', auth(), adminOnly, async (req, res) => {
  await db.run("DELETE FROM users WHERE id = $1 AND role = 'player'", [req.params.id]);
  res.json({ message: '已刪除帳號' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Word Quest running at http://localhost:${port}`);
  });
}

module.exports = app;
