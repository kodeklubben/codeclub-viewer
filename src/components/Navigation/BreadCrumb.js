import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {capitalize} from '../../util';

const BreadCrumb = ({params, lessons, context}) => {
  const {course, lesson, file} = params;
  const lessonPath = file ? `./${course}/${lesson}/${file}.md` : '';
  const isReadme = (file && /README(_[a-z]{2})?/.test(file));
  let title = '';
  let level = 0;
  if (isReadme) {
    title = context.readmeContext(lessonPath).frontmatter.title;
    level = context.readmeContext(lessonPath).frontmatter.level;
  }
  else {
    title = lessonPath ? lessons[lessonPath].title : title;
    level = lessonPath ? lessons[lessonPath].level : level;
  }
  const homeLink = <NavLink to='/' onlyActiveOnIndex>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;
  const courseLink = course ?
    <NavLink to={`/${course}`} className={styles.lessonLink}>
      <img className={styles.courseIcon} src={context.iconContext('./' + course + '/logo-black.png')}/>
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
  }),

  // mapStateToProps
  lessons: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

const mapStateToProps = (state, {params}) => ({
  lessons: state.lessons,
  context: state.context
});

export default connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
