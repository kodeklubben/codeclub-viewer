import React, {PropTypes} from 'react';
import markdownGenerator from 'markdown-it';

const markdown = markdownGenerator();

const MarkdownRenderer = ({src, inline}) => {
  if (src) {
    return inline ?
      <span dangerouslySetInnerHTML={{__html: markdown.renderInline(src)}}/> :
      <div dangerouslySetInnerHTML={{__html: markdown.render(src)}}/>;
  } else {
    return null;
  }
};
MarkdownRenderer.propTypes = {
  src: PropTypes.string,
  inline: PropTypes.bool
};

export default MarkdownRenderer;
