/* eslint-env node */

const publicPath = process.env.PUBLICPATH;

/**
 * Process parsed HTML object
 * @param {object} refObj Parsed HTML object
 * @param  {object} options Options object
 * @returns {object}
 */
const processObject = (refObj, options) => {
  let obj = refObj;
  if (obj['tag'] === 'a') {
    const oldHref = (obj['attrs'] || {})['href'];
    if (oldHref && typeof oldHref === 'string') {
      if (!oldHref.startsWith('http:') && !oldHref.startsWith('https:')) {
        const baseurl = `${publicPath}${options.baseurl.slice(1)}`;
        let href = `${baseurl}${oldHref.startsWith('/') ? '' : '/'}${oldHref}`;
        if (href.endsWith('.html')) { href = href.slice(0, -5); }
        if (href !== oldHref) {
          obj = {
            ...obj,
            attrs: {
              ...obj['attrs'],
              href,
            }
          };
        }
      }
    }
  }
  return {
    ...obj,
    content: walkParsedHtmlRecursively(obj['content'], options),
  };
};

/**
 * Walk recursively through parsed HTML object
 * @param {object} obj Parsed HTML object
 * @param  {object} options Options object
 * @returns {object}
 */
const walkParsedHtmlRecursively = (obj, options) => {
  if (Array.isArray(obj)) {
    return obj.map(val => walkParsedHtmlRecursively(val, options));
  } else if (typeof obj === 'object' && obj !== null) {
    return processObject(obj, options);
  } else {
    return obj;
  }
};

/**
 * Process course info html
 * @param {string} content Original HTML
 * @param {object} options Options object of the form
 * {
 *   baseurl: /scratch
 * }
 * @returns {string} The HTML as a string
 */
export const processCourseInfo = (content, options) => {
  const parser = require('posthtml-parser');
  const render = require('posthtml-render');

  let parsedContent = parser(content);
  parsedContent = walkParsedHtmlRecursively(parsedContent, options);
  content = render(parsedContent);
  return content;
};
