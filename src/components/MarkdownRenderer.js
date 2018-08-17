import React from 'react';
import PropTypes from 'prop-types';
import markdownGenerator from 'markdown-it';
import renderHTML from 'react-render-html';

const markdown = markdownGenerator();

const MarkdownRenderer = ({src, inline}) => {
  if (src) {
    return inline ?
      <span>{renderHTML(markdown.renderInline(src))}</span> :
      <div>{renderHTML(markdown.render(src))}</div>;
  } else {
    return null;
  }
};

MarkdownRenderer.propTypes = {
  // ownProps
  src: PropTypes.string,
  inline: PropTypes.bool
};

export default MarkdownRenderer;
