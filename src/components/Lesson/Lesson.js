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
    // TODO: Remove scripts upon unmount?
    if (containsScratchCode(this.props.lesson.content)) {
      // TODO: use local scripts
      appendScript('http://scratchblocks.github.io/js/scratchblocks-v3.1-min.js')
      .then(() => appendScript('http://scratchblocks.github.io/js/translations-all-v3.1-min.js'))
      .then(renderScratchBlocks);
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

/**
 * Takes a script url and appends it to the HTML body.
 *
 * @param url {string}
 * @returns {Promise} Resolves when script has loaded.
 */
function appendScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

/**
 * Appends a script to the HTML body that will render scratch code.
 */
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
 * @returns {bool} True if html contains scratch code.
 */
function containsScratchCode(html){
  return (html.indexOf('<pre class="blocks">') !== -1 ||
          html.indexOf('<code class="b">') !== -1);
}
