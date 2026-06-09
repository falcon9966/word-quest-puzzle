const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { parseWordText, buildLevels } = require('../server/wordService');

test('parseWordText reads books, units, english words, and Chinese meanings', () => {
  const text = fs.readFileSync(path.join(__dirname, '..', '單字.txt'), 'utf8');
  const words = parseWordText(text);

  assert.equal(words[0].book, 1);
  assert.equal(words[0].unit, 1);
  assert.equal(words[0].english, 'walk');
  assert.equal(words[0].chinese, '走路');
  assert.equal(words.some((word) => word.book === 6 && word.unit === 20), true);
});

test('buildLevels groups every two consecutive units into one playable level', () => {
  const sample = [
    { book: 1, unit: 1, english: 'walk', chinese: '走路' },
    { book: 1, unit: 2, english: 'moon', chinese: '月亮' },
    { book: 1, unit: 3, english: 'cake', chinese: '蛋糕' },
    { book: 2, unit: 1, english: 'egg', chinese: '蛋' }
  ];

  const levels = buildLevels(sample);

  assert.equal(levels.length, 3);
  assert.deepEqual(levels[0].units, [1, 2]);
  assert.equal(levels[0].words.length, 2);
  assert.equal(levels[1].lockedByDefault, true);
  assert.equal(levels[2].book, 2);
  assert.deepEqual(levels[2].units, [1, 2]);
});
