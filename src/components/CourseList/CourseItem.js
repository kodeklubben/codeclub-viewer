import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getLessonIntro} from '../../util';
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const CourseItem = ({course, t, language}) => {
  const coursePath = course.path || null;
  const tooltipContent = coursePath === null ? null :
    getLessonIntro(coursePath + '/index' + (language === 'nb' ? '' : ('_' + language)));
  const createMarkup = () => {
    return {__html: tooltipContent};
  };
  const tooltip =
    <Tooltip className={styles.tooltip} id={course.name}>
      <div dangerouslySetInnerHTML={createMarkup()}/>
    </Tooltip>;

  const isExternal = course.hasOwnProperty('externalLink');
  return (
    <OverlayTrigger animation={true} delayShow={400} placement="bottom" overlay={tooltip}>
      {isExternal ?
        <a className={styles.courseItem} href={course.externalLink} target='_blank'>
          <img className={styles.courseLogo} src={course.iconPath}/>
          <span className={styles.courseName}>{course.name} <Glyphicon glyph='new-window'/></span>
        </a>
        :
        <Link className={styles.courseItem} to={course.path}>
          <img className={styles.courseLogo} src={course.iconPath}/>
          <span className={styles.courseName}>{course.name}</span>
          <span className={styles.lessonCount}>{t('playlist.lessons')}: {course.lessonCount}</span>
        </Link>
      }
    </OverlayTrigger>
  );
};

CourseItem.propTypes = {
  t: PropTypes.func,
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    externalLink: PropTypes.string,
    iconPath: PropTypes.string,
    lessonCount: PropTypes.int
  }),
  language: PropTypes.string
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  language: state.language
});

export default connect(mapStateToProps)(withStyles(styles)(CourseItem));
