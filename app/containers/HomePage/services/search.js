const BASIC = 'BASIC';

function basic(arrayOfText, subString, params) {
  const result = [];

  function findMatch(string) {
    const matches = [];
    const regex = new RegExp(subString, 'g');
    // match all occurences in the string
    while (true) {
      const match = regex.exec(string);
      if (!match) {
        break;
      }
      matches.push([regex.lastIndex - subString.length, regex.lastIndex]);
    }
    return matches;
  }
  arrayOfText.forEach((row) => {
    const text = row[params.key];
    const matches = findMatch(text);
    if (matches.length > 0) {
      result.push({
        [params.id]: row[params.id],
        indexes: matches
      });
    }
  });
  return result;
}

const searchAlog = {
  [BASIC]: basic
};

// Peform a simple regex based search but also provide a extension point
export function search(arrayOfText, subString, params = { id: 'id', key: 'title' }) {
  if (subString.length === 0) return [];
  return searchAlog[BASIC](arrayOfText, subString.trim(), params);
}
