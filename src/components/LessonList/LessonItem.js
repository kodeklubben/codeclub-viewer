import React, {PropTypes} from 'react';
import NavLink from '../Navigation/NavLink';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const LessonItem = React.createClass({
  render() {
    const lesson = this.props.lesson;

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
          <NavLink to={lesson.path}>
            <div className={styles.lessonItem}>
              {constraints}
              {lesson.title}
            </div>
          </NavLink>
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
