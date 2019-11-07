// Structure of replaceTags:
// {
//   <oldtag>: {
//     tag: <newtag>
//     attrs: {
//       <attribute>: <value>,
//       ...
//     }
// }
const replaceTags = {
  toggle: {
    tag: 'div',
    attrs: {
      class: 'togglebutton',
      style: 'visibility: hidden',
    }
  }
};

/**
 * Replaces div's with class togglebutton
 * @param {object} obj
 * @returns {object}
 */
const replaceTagObject = (obj) => {
  const tag = obj['tag'];
  if (tag in replaceTags) {
    const replacementObj = replaceTags[tag];
    return {
      ...obj,
      tag: replacementObj['tag'],
      attrs: {...obj['attrs'], ...replacementObj['attrs']}
    };
  } else {
    return obj;
  }
};

/**
 * Adding pictures to h2's with correct classnames
 * @param {object} obj
 * @returns {object}
 */
const insertHeaderIcons = (obj) => {
  const icons = {
    'check': require('assets/graphics/check.svg'),
    'flag': require('assets/graphics/flag.svg'),
    'save': require('assets/graphics/save.svg'),
  };
  if (obj.tag === 'h2') {
    const className = (obj.attrs || {}).class;
    if (Object.keys(icons).includes(className)) {
      return {
        ...obj,
        content: [
          {
            tag: 'img',
            attrs: {
              src: icons[className],
              alt: className
            }
          },
          ...obj.content
        ]
      };
    }
  }
  return obj;
};

/**
 * Replaces classes
 * @param {object} obj
 * @param {object} styles css-modules object
 * @returns {object}
 */
const replaceClass = (obj, styles) => {
  let newObj = {};
  for (let k of Object.keys(obj)) {
    if (k === 'class' && obj[k] in styles) {
      newObj[k] = styles[obj[k]];
    } else {
      newObj[k] = replaceClassRecursively(obj[k], styles);
    }
  }
  return newObj;
};

/**
 * Replaces classes recursively
 * @param {object} obj
 * @param {object} styles css-modules object
 * @returns {object}
 */
const replaceClassRecursively = (obj, styles) => {
  if (Array.isArray(obj)) {
    return obj.map((val, idx) => replaceClassRecursively(val, styles));
  } else if (typeof obj === 'object' && obj !== null) {
    let repObj = obj;
    repObj = replaceTagObject(repObj);
    repObj = insertHeaderIcons(repObj);
    repObj = replaceClass(repObj, styles);
    return repObj;
  } else {
    return obj;
  }
};

/**
 * Process all of the content
 * @param {string} content HTML with <pre class="blocks">...</pre>
 * @param {object} styles css-modules object
 * @param {boolean} isHydrated
 * @returns {string} The HTML as a string
 */
export const processContent = (content, styles) => {
  const parser = require('posthtml-parser');
  const render = require('posthtml-render');

  let parsedContent = parser(content);
  parsedContent = replaceClassRecursively(parsedContent, styles);
  content = render(parsedContent);
  return content;
};
