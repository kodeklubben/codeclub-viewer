import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const LessonItem = React.createClass({
  render() {
    const lesson = this.props.lesson;

    // Check if indexed is set to false
    if (lesson.hasOwnProperty('indexed') && lesson.indexed != null && !lesson.indexed) return null;

    /*Temporary constraint mocks are used until they are implemented*/
    const constraintStyle = {float: 'right', color: 'gray', fontSize: '1.1em'};
    const constraints = (this.props.constraints || []).map((constraint, idx) => {
      switch (constraint) {
        case 'internet-explorer':
          return <span key={idx} style={constraintStyle}><Glyphicon glyph="fire"/></span>;
        case 'tablet':
          return <span key={idx} style={constraintStyle}><Glyphicon key={idx} glyph="phone"/></span>;
        case 'money':
          return <span key={idx} style={constraintStyle}><Glyphicon key={idx} glyph="euro"/></span>;
      }
      return null;
    });
    const isExternal = lesson.external.length > 0;
    return (
      <li className='list-group-item'>
        {isExternal ?
          <a href={lesson.external} target="_blank">
            <div className={styles.lessonItem}>
              {constraints}
              {lesson.title} <Glyphicon glyph="share"/>
            </div>
          </a>
          :
          <Link to={lesson.path}>
            <div className={styles.lessonItem}>
              {constraints}
              {lesson.title}
            </div>
          </Link>
        }
      </li>
    );
  }
});

LessonItem.propTypes = {
  constraints: PropTypes.array,
  lesson: PropTypes.object
};

export default withStyles(styles)(LessonItem);
