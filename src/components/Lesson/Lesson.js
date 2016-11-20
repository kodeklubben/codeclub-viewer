/* eslint-env node */

import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import scratchblocks from 'scratchblocks/browser/scratchblocks.js';
import LevelIcon from '../LevelIcon';

const Lesson = React.createClass({
  getTitle() {
    return this.props.lesson.frontmatter.title;
  },
  getLevel() {
    return this.props.lesson.frontmatter.level;
  },
  getAuthor() {
    return this.props.lesson.frontmatter.author;
  },
  createMarkup(){
    return {
      __html: this.props.lesson.content
    };
  },
  componentWillMount(){
    if (typeof document === 'undefined') {
      // do nothing server-side
      return;
    }
    this.props.lesson.content = prepareHtml(this.props.lesson.content);
  },
  render() {
    return (
      <div className={styles.container}>
        <h1><LevelIcon level={this.getLevel()} size="large"/>{this.getTitle()} - Level {this.getLevel()}</h1>
        <p><i>av {this.getAuthor()}</i></p>
        <div dangerouslySetInnerHTML={this.createMarkup()}/>
      </div>
    );
  }
});

Lesson.propTypes = {
  lesson: PropTypes.shape({
    frontmatter: PropTypes.object,
    content: PropTypes.string
  })
};

export default withStyles(styles)(Lesson);

/////////////////////
// PRIVATE FUNCTIONS:

// TODO:
//  - non-mutating replaceClassRecursively
//  - clean up constainsScratchCode and renderScratchBlocks, inkl. DRY
//  - activate the rest of Lesson.scss (compare with kodeklubben.github.io)

const parser = require('posthtml-parser');
const render = require('posthtml-render');

// This mutates the object -- make a version that doesn't do that!
function replaceClassRecursively(obj) {
  for (var k in obj) {
    if (typeof obj[k] == 'object' && obj[k] !== null) {
      replaceClassRecursively(obj[k]);
    } else {
      if (k === 'class') {
        if (obj[k] in styles) {
          console.log(obj[k]);
          console.log(styles[obj[k]]);
          obj[k] = styles[obj[k]];
        }
      }
    }
  }
}

function prepareHtml(content) {
  //console.log(styles);
  //console.log(content);
  const parsedContent = parser(content);
  //console.log(parsedContent);
  replaceClassRecursively(parsedContent);
  //console.log(parsedContent);
  content = render(parsedContent);
  //console.log(content);
  if (containsScratchCode(content)) {
    content = renderScratchBlocks(content);
  }
  return content;
}


/**
 * Render scratchblocks.
 *
 * @param content {string} HTML with <pre class="blocks">...</pre>
 * @returns {string} <pre class="blocks">...</pre> replaced with SVG
 */
function renderScratchBlocks(content) {
  let replace = [];
  // minified in production build, attr="val" -> attr=val
  if ('blocks' in styles) {
    replace.push({ start: '<pre class=' + styles.blocks + '>', end: '</pre>' }); // not needed after posthtml-render
    replace.push({ start: '<pre class="' + styles.blocks + '">', end: '</pre>' });
  }
  if ('b' in styles) {
    replace.push({ start: '<code class=' + styles.b + '>', end: '</code>', options: { inline: true } });  // not needed after posthtml-render
    replace.push({ start: '<code class="' + styles.b + '">', end: '</code>', options: { inline: true } });
  }
  // const replace = [
  //   { start: '<pre class=' + styles.blocks + '>', end: '</pre>' },
  //   { start: '<pre class="' + styles.blocks + '">', end: '</pre>' },
  //   { start: '<code class=' + styles.b + '>', end: '</code>', options: { inline: true } },
  //   // for dev server, attr="val" minified to attr=val in production build
  //   { start: '<code class="' + styles.b + '">', end: '</code>', options: { inline: true } }
  // ];

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

/**
 * Search in `html` for `<pre class="blocks">`. Returns true if found.
 *
 * @param html {string} String to search.
 * @returns {boolean} True if html contains scratch code.
 */
function containsScratchCode(html){
  let blocks = [];
  // minified in production build, attr="val" -> attr=val
  if ('blocks' in styles) {
    blocks.push('<pre class=' + styles.blocks + '>');  // not needed after posthtml-render
    blocks.push('<pre class="' + styles.blocks + '">');
  }
  if ('b' in styles) {
    blocks.push('<code class=' + styles.b + '>');  // not needed after posthtml-render
    blocks.push('<code class="' + styles.b + '">');
  }
  for (let i = 0; i < blocks.length; i += 1) {
    if (html.indexOf(blocks[i]) !== -1) {
      return true;
    }
  }
  return false;
}
