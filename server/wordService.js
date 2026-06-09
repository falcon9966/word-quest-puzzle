function parseWordText(text) {
  const words = [];
  let book = 0;
  let unit = 0;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    const bookMatch = line.match(/第\s*(\d+)\s*冊/);
    const unitMatch = line.match(/\*\*Unit\s+(\d+)\*\*/i);
    const wordMatch = line.match(/^-\s*([A-Za-z][A-Za-z\s'-]*)\s+(.+)$/);

    if (bookMatch) {
      book = Number(bookMatch[1]);
      continue;
    }

    if (unitMatch) {
      unit = Number(unitMatch[1]);
      continue;
    }

    if (book && unit && wordMatch) {
      words.push({
        book,
        unit,
        english: wordMatch[1].trim().toLowerCase(),
        chinese: wordMatch[2].trim()
      });
    }
  }

  return words;
}

function buildLevels(words) {
  const grouped = new Map();

  for (const word of words) {
    const levelInBook = Math.ceil(word.unit / 2);
    const globalLevel = (word.book - 1) * 10 + levelInBook;
    const key = `${word.book}-${levelInBook}`;

    if (!grouped.has(key)) {
      const firstUnit = levelInBook * 2 - 1;
      grouped.set(key, {
        id: globalLevel,
        book: word.book,
        levelInBook,
        title: `第${word.book}冊 第${levelInBook}關`,
        units: [firstUnit, firstUnit + 1],
        lockedByDefault: globalLevel > 1,
        words: []
      });
    }

    grouped.get(key).words.push(word);
  }

  return Array.from(grouped.values()).sort((a, b) => a.id - b.id);
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

module.exports = { parseWordText, buildLevels, shuffle };
