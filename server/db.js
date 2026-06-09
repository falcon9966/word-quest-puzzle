const fs = require('node:fs');
const path = require('node:path');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const { parseWordText } = require('./wordService');

const root = path.join(__dirname, '..');
const dbPath = path.join(root, 'db', 'game.sqlite');
const schemaPath = path.join(root, 'db', 'schema.sql');
const wordPath = path.join(root, '單字.txt');

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

function initDatabase() {
  db.exec(fs.readFileSync(schemaPath, 'utf8'));

  const admin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  if (!admin) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password_hash, nickname, role) VALUES (?, ?, ?, ?)')
      .run('admin', hash, '管理員', 'admin');
  }

  if (db.prepare('SELECT COUNT(*) AS count FROM words').get().count === 0 && fs.existsSync(wordPath)) {
    importWordsFromText(fs.readFileSync(wordPath, 'utf8'));
  }
}

function importWordsFromText(text) {
  const words = parseWordText(text);
  const insert = db.prepare(
    'INSERT OR IGNORE INTO words (book, unit, english, chinese) VALUES (?, ?, ?, ?)'
  );
  const transaction = db.transaction((rows) => {
    for (const word of rows) {
      insert.run(word.book, word.unit, word.english, word.chinese);
    }
  });
  transaction(words);
  return words.length;
}

module.exports = { db, initDatabase, importWordsFromText };
