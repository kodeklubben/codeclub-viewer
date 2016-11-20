import scratchblocks from 'scratchblocks/browser/scratchblocks.js';

// TODO:
//  - if possible, make webpack preprocess the HTML.
//    - replace classnames with locally scoped css-module class names
//    - insert scratch blocks if possible
//  - activate the rest of Lesson.scss (compare with kodeklubben.github.io)


function processContent(content, styles) {
  const parser = require('posthtml-parser');
  const render = require('posthtml-render');

  let parsedContent = parser(content);
  parsedContent = replaceClassRecursively(parsedContent, styles);
  content = render(parsedContent);
  content = renderScratchBlocks(content, styles);
  return content;
}

function replaceClassRecursively(obj, styles) {
  if (Array.isArray(obj)) {
    return obj.map((val, idx) => replaceClassRecursively(val, styles));
  } else if (typeof obj === 'object' && obj !== null) {
    var newObj = {};
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (k === 'class' && obj[k] in styles) {
          newObj[k] = styles[obj[k]];
        } else {
          newObj[k] = replaceClassRecursively(obj[k], styles);
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}


/**
 * Render scratchblocks.
 *
 * @param content {string} HTML with <pre class="blocks">...</pre>
 * @returns {string} <pre class="blocks">...</pre> replaced with SVG
 */
function renderScratchBlocks(content, styles) {
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
}

export default processContent;
