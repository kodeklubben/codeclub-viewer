import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const LessonItem = React.createClass({
  render() {
    const lesson = this.props.lesson;

    const constraints = (lesson.constraints || []).map((constraint, idx) => {
      const imgPath = '../../assets/graphics/constraints/' + constraint + '.png';
      //TODO: Import/require/use image correctly
      return <img key={idx} className={styles.constraintImg} src={imgPath}/>;
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
