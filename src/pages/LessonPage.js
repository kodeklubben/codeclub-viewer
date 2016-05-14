import React, {PropTypes} from 'react';

const LessonPage = React.createClass({
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
  render() {
    //console.log(this.props.lesson.frontmatter);
    return (
      <div>
        <h1>{this.getTitle()} - Level {this.getLevel()}</h1>
        <p><i>av {this.getAuthor()}</i></p>
        <div dangerouslySetInnerHTML={this.createMarkup()}/>
      </div>
    );
  }
});

LessonPage.PropTypes = {
  lesson: PropTypes.shape({
    frontmatter: PropTypes.object,
    content: PropTypes.string
  })
};

export default LessonPage;
