import {getAvailableLanguages} from './filterUtils';

/**
 * Render scratchblocks
 * @param {string} content HTML with <pre class="blocks">...</pre> and <code class="b">...</code>
 * @param {object} styles css-modules object
 * @returns {string} <pre class="blocks">...</pre> and <code class="b">...</code> replaced with SVG
 */
export const renderScratchBlocks = (content, styles) => {
  const scratchblocks = require('scratchblocks/browser.js');

  // NOTE: English (en) is included by default. All other languages
  //       that exist in getAvailableLanguages() should be loaded here,
  //       otherwise rendering will fail.
  //       It is also possible to just do a
  //           require('scratchblocks/locales-src/translations-all.js')
  //       but that includes many unnecessary files.
  scratchblocks.loadLanguages({
    nb: require('scratchblocks/locales/nb.json'),
    nn: require('scratchblocks/locales/nn.json'),
    is: require('scratchblocks/locales/is.json'),
    ua: require('scratchblocks/locales/ua.json'),
  });

  let replace = [];
  if ('blocks' in styles) {
    replace.push({
      start: '<pre class="' + styles.blocks + '">',
      end: '</pre>',
      options: {languages: getAvailableLanguages()}
    });
  }
  if ('b' in styles) {
    replace.push({
      start: '<code class="' + styles.b + '">',
      end: '</code>',
      options: {inline: true, languages: getAvailableLanguages()}
    });
  }
  let returnContent = content;
  replace.forEach(r => {
    const re = new RegExp(r.start + '[\\s\\S]*?' + r.end, 'g');

    let blocks = content.match(re);
    if (blocks) {
      blocks.forEach(block => {
        let code = block.substring(r.start.length, block.length - r.end.length);
        let doc = scratchblocks.parse(code, r.options);
        let docView = scratchblocks.newView(doc, {style: 'scratch3'});
        let svg = docView.render();
        svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        svg.style.maxWidth = '100%';
        if (r.options.inline) {
          svg.style.margin = '3px 0';
          svg.style.verticalAlign = 'middle';
        }
        else {
          svg.style.display = 'block';
          svg.style.margin = '0 auto 15px';
        }
        returnContent = returnContent.replace(block, svg.outerHTML);
      });
    }
  });
  return returnContent;
};
