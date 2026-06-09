const { Pool } = require('pg');
const fs = require('node:fs');
const path = require('node:path');
const bcrypt = require('bcryptjs');
const { parseWordText } = require('./wordService');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.VERCEL ? { rejectUnauthorized: false } : undefined,
});

const db = {
  all: async (sql, params) => (await pool.query(sql, params)).rows,
  get: async (sql, params) => { const r = await pool.query(sql, params); return r.rows[0] || null; },
  run: async (sql, params) => await pool.query(sql, params),
};

async function initDatabase() {
  const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
  await pool.query(fs.readFileSync(schemaPath, 'utf8'));

  const admin = await db.get('SELECT id FROM users WHERE username = $1', ['admin']);
  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10);
    await db.run(
      'INSERT INTO users (username, password_hash, nickname, role) VALUES ($1, $2, $3, $4)',
      ['admin', hash, '管理員', 'admin']
    );
  }

  const wordCount = await db.get('SELECT COUNT(*) AS count FROM words');
  const wordPath = path.join(__dirname, '..', '單字.txt');
  if (Number(wordCount.count) === 0 && fs.existsSync(wordPath)) {
    await importWordsFromText(fs.readFileSync(wordPath, 'utf8'));
  }
}

async function importWordsFromText(text) {
  const words = parseWordText(text);
  let count = 0;
  for (const word of words) {
    try {
      await db.run(
        'INSERT INTO words (book, unit, english, chinese) VALUES ($1, $2, $3, $4) ON CONFLICT (book, unit, english, chinese) DO NOTHING',
        [word.book, word.unit, word.english, word.chinese]
      );
      count++;
    } catch {}
  }
  return count;
}

module.exports = { db, pool, initDatabase, importWordsFromText };
