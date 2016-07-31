/* eslint-env node */

import React, {PropTypes} from 'react';
import scratchblocks from 'scratchblocks/browser/scratchblocks.js';

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
    if (process) {
      // do nothing server-side
      return;
    }
    let content = this.props.lesson.content;
    if (containsScratchCode(content)) {
      this.props.lesson.content = renderScratchBlocks(content);
    }
  },
  render() {
    return (
      <div>
        <h1>{this.getTitle()} - Level {this.getLevel()}</h1>
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

export default Lesson;


/////////////////////
// PRIVATE FUNCTIONS:

/**
 * Render scratchblocks.
 *
 * @param content {string} HTML with <pre class="blocks">...</pre>
 * @returns {string} <pre class="blocks">...</pre> replaced with SVG
 */
function renderScratchBlocks(content) {
  const replace = [
    { start: '<pre class="blocks">', end: '</pre>' },
    { start: '<code class="b">', end: '</code>', options: { inline: true } }
  ];

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
  return (html.indexOf('<pre class="blocks">') !== -1 ||
          html.indexOf('<code class="b">') !== -1);
}
