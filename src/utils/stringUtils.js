/* eslint-env node */

/**
 * Makes first character in str upper case
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

/**
 * Returns the filename, like the unix equivalent and path.dirname. Trailing slashes are ignored.
 * @param {string} path any path
 * @returns {string} the whole path, except the filename
 */
export const basename = (path) => {
  if (path === '') { return ''; }
  const b = path.match(/.*\/([^/]+)\/*$/);
  return b == null ? path : b[1];
};

/**
 * Returns the path except the filename, like the unix equivalent and path.basename. Trailing slashes are ignored.
 * @param {string} path any path
 * @returns {string} only the filename
 */
export const dirname = (path) => {
  if (path.match(/^\/+$/)) { return '/'; }
  const b = path.match(/(.*)\/[^/]+\/*$/);
  return b == null ? '.' : (b[1] === '' ? '/' : b[1]);
};

/**
 * Get the first paragraph and first picture in the html.
 * @param {string} html The whole html
 * @param {string} path The path to the html, starting with a slash,
 *                      e.g. '/scratch/astrokatt/astrokatt_nn' or '/scratch/index'
 * @returns {string} HTML code to e.g. display in a popover.
 */
export const extractFirstPartOfHtml = (html, path) => {
  let text, picture = '';
  html = html.substring(html.indexOf('<section class="intro"'));
  const p = html.indexOf('<p>');
  const closingP = html.indexOf('</p>');
  const img = html.indexOf('<img');
  const closingFig = html.indexOf('</figure');
  if (p < closingP) {
    text = html.substring(p, closingP);
    if (text.length > 300) {
      text = html.substring(p, 300) + '...';
    }
    picture = img < closingFig ? html.substring(img, closingFig) : '';
    // Add path to image. The following regex allows for attributes with or without quotes,
    // e.g. <img src="astrokatt.png" />, <img src=astrokatt.png />, <img src=astrokatt.png/>,
    // and <img src=astrokatt.png>
    picture = picture.replace(
      /( src="?)([^" />]*)([" />])/,
      '$1' + process.env.PUBLICPATH + dirname(path).slice(1) + '/$2$3',
    );
  }
  return (picture || '') + (text || '');
};
