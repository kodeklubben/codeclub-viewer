import React, {PropTypes} from 'react';

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
  componentDidMount() {
    if (containsScratchCode(this.props.lesson.content)) {
      renderScratchBlocks();
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
 * Appends a script to the HTML body that will render scratch code.
 */
// TODO: Get all languages supported.
function renderScratchBlocks() {
  const script = document.createElement('script');
  script.text = `
    scratchblocks.renderMatching('pre.blocks', {
      languages: ['nb', 'en']
    });
    scratchblocks.renderMatching('code.b', {
      languages: ['nb', 'en'],
      inline: true
    });
  `.trim();
  document.body.appendChild(script);
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
