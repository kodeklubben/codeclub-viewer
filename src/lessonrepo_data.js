/**
 * Returns object: { groupKey1: [tagKey1, tagKey2, ...], groupKey2: [tagKey1, tagKey2, ...] }
 * It also makes sure all groupKeys and filterKeys are lower case.
 */
export function getFilterkeys() {
  const filterKeys = require('onlyFrontmatter!lessonFiltertags/keys.md').frontmatter;
  return Object.keys(filterKeys).reduce( (result, groupKey) => {
    result[groupKey.toLowerCase()] = filterKeys[groupKey].map(tagKey => tagKey.toLowerCase());
    return result;
  }, {});
}
