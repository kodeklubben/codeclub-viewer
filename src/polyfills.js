// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position){
    return this.substr(position || 0, searchString.length) === searchString;
  };
}

// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
    const subjectString = this.toString();
    if (typeof position !== 'number'
      || !isFinite(position)
      || Math.floor(position) !== position
      || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    const lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}
