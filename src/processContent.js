import scratchblocks from 'scratchblocks/browser/scratchblocks.js';

// TODO:
//  - if possible, make webpack preprocess the HTML.
//    - replace classnames with locally scoped css-module class names
//    - insert scratch blocks if possible
//  - activate the rest of Lesson.scss (compare with kodeklubben.github.io)

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
      class: 'togglebutton'
    }
  }
};

const processContent = (content, styles) => {
  const parser = require('posthtml-parser');
  const render = require('posthtml-render');

  let parsedContent = parser(content);
  parsedContent = replaceClassRecursively(parsedContent, styles);
  content = render(parsedContent);
  content = renderScratchBlocks(content, styles);
  return content;
};

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

const replaceClassRecursively = (obj, styles) => {
  if (Array.isArray(obj)) {
    return obj.map((val, idx) => replaceClassRecursively(val, styles));
  } else if (typeof obj === 'object' && obj !== null) {
    const repObj = replaceTagObject(obj);
    let newObj = {};
    for (let k in repObj) {
      if (repObj.hasOwnProperty(k)) {
        if (k === 'class' && repObj[k] in styles) {
          newObj[k] = styles[repObj[k]];
        } else {
          newObj[k] = replaceClassRecursively(repObj[k], styles);
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
};


/**
 * Render scratchblocks.
 *
 * @param content {string} HTML with <pre class="blocks">...</pre>
 * @returns {string} <pre class="blocks">...</pre> replaced with SVG
 */
const renderScratchBlocks = (content, styles) => {
  let replace = [];
  if ('blocks' in styles) {
    replace.push({start: '<pre class="' + styles.blocks + '">', end: '</pre>'});
  }
  if ('b' in styles) {
    replace.push({start: '<code class="' + styles.b + '">', end: '</code>', options: {inline: true}});
  }

  let returnContent = content;
  replace.forEach(r => {
    const re = new RegExp(r.start + '[\\s\\S]*?' + r.end, 'g');

    let blocks = content.match(re);
    if (blocks) {
      blocks.forEach(block => {
        let code = block.substring(r.start.length, block.length - r.end.length);
        let SVG = scratchblocks(code, r.options);
        returnContent = returnContent.replace(block, SVG);
      });
    }
  });

  return returnContent;
};

export default processContent;
