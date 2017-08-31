import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {capitalize} from '../../util';
import {getTitle, getLevel} from '../../selectors/frontmatter';

const BreadCrumb = ({params, title, level, courseIcon}) => {
  const {course, lesson, file} = params;
  const homeLink = <NavLink to='/' onlyActiveOnIndex>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;
  const courseLink = course ?
    <NavLink to={`/${course}`} className={styles.lessonLink}>
      <img className={styles.courseIcon} src={courseIcon}/>
      <span className={styles.lesson}>{capitalize(course)}</span>
    </NavLink> : null;
  const lessonLink = course && lesson && file ?
    <NavLink to={`/${course}/${lesson}/${file}`} className={styles.lessonLink}>
      <LevelIcon {...{level}}/>
      <span className={styles.lesson}>{title}</span>
    </NavLink> : null;
  return <div className={styles.breadcrumb}>
    {homeLink}
    {courseLink ? <span> / </span> : null}
    {courseLink ? courseLink : null}
    {lessonLink ? <span> / </span> : null}
    {lessonLink ? lessonLink : null}
  </div>;
};

BreadCrumb.propTypes = {
  // ownProps
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }).isRequired,

  // mapStateToProps
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  courseIcon: PropTypes.string,
};

const mapStateToProps = (state, {params}) => ({
  title: getTitle(state, params),
  level: getLevel(state, params),
  courseIcon: params.course ? state.context.iconContext('./' + params.course + '/logo-black.png') : null
});

export default connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
