import React, {PropTypes} from 'react';
import Lesson from '../components/Lesson';
import {lessonContext} from '../utils/contexts';

const LessonPage = React.createClass({
  render() {
    //console.log(this.props.lesson.frontmatter);
    const params = this.props.params;
    const lessonPath = lessonContext.keys().find(path => {
      const regexp = new RegExp(`\.\/${params.course}\/${params.lesson}`);
      return regexp.exec(path);
    });
    const lesson = lessonContext(lessonPath);
    return (
      <Lesson lesson={lesson}/>
    );
  }
});

LessonPage.PropTypes = {
  params: PropTypes.shape({
    course: PropTypes.string.isRequired,
    lesson: PropTypes.string.isRequired
  })
};

export default LessonPage;
