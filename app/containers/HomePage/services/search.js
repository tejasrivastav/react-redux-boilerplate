let BASIC = "BASIC";
let searchAlog = {
  [BASIC]: basic
}

function basic(arrayOfText, subString, params) {
  let result = [];

  function findMatch(string, subString) {
    let matches = [];
    let regex = new RegExp(subString, 'g');
    let match = null;
    while ((match = regex.exec(string)) !== null) {
      matches.push([regex.lastIndex-subString.length, regex.lastIndex]);
    }
    return matches;
  }
  arrayOfText.forEach((row)=>{
    let text = row[params.key];
    let matches = findMatch(text, subString);
    if(matches.length>0) {
      result.push({
        [params._id]: row[params._id],
        indexes: matches,
        text
      });
    }
  });
  return result;
}

// Peform a simple regex based search but also provide a extension point
export function search(arrayOfText, subString, params={_id:"id", key:"title"}) {
  if(subString.length === 0)
    return;
  return searchAlog[BASIC](arrayOfText, subString.trim(), params);
}
