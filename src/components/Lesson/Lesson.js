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
//  - move these functions into a util file
//  - if possible, make webpack preprocess the HTML.
//    - replace classnames with locally scoped css-module class names
//    - insert scratch blocks if possible
//  - non-mutating replaceClassRecursively
//  - clean up constainsScratchCode and renderScratchBlocks, inkl. DRY
//  - activate the rest of Lesson.scss (compare with kodeklubben.github.io)

const parser = require('posthtml-parser');
const render = require('posthtml-render');

function replaceClassRecursivelyImm(obj) {
  if (Array.isArray(obj)) {
    return obj.map((val, idx) => replaceClassRecursivelyImm(val));
  } else if (typeof obj === 'object' && obj !== null) {
    var newObj = {};
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (k === 'class' && obj[k] in styles) {
          newObj[k] = styles[obj[k]];
        } else {
          newObj[k] = replaceClassRecursivelyImm(obj[k]);
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

function prepareHtml(content) {
  let parsedContent = parser(content);
  parsedContent = replaceClassRecursivelyImm(parsedContent);
  content = render(parsedContent);
  content = renderScratchBlocks(content);
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

