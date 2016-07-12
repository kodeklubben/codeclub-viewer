import React, {PropTypes} from 'react';
import LessonItem from './LessonItem';
import {getLevelName} from '../../util';

const LessonList = React.createClass({
  render() {
    const lessons = this.props.lessons;
    const level = this.props.level;
    return (
      <div id={this.props.id}>
        <h3>{level + '. ' + getLevelName(level)}</h3>
        <ul className='list-group'>
          {lessons.map((lesson, idx) =>
            lesson.indexed ?
              <LessonItem key={idx} lesson={lesson}/>
              : null
          )}
        </ul>
      </div>
    );
  }
});

LessonList.propTypes = {
  id: PropTypes.string,
  lessons: PropTypes.array,
  level: PropTypes.string
};

export default LessonList;
