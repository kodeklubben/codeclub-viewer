import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

export function BreadCrumb(props) {
  const params = props.params;
  const homeLink = <NavLink to='/' onlyActiveOnIndex>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;
  const courseLink = params.course ?
    <NavLink to={`/${params.course}`}>
      <img className={styles.courseIcon} src={props.iconContext('./' + params.course + '/logo-black.png')}/>
    </NavLink> : null;
  const lessonLink = params.course && params.lesson && params.file ?
    <NavLink to={`/${params.course}/${params.lesson}/${params.file}`} className={styles.lessonLink}>
      <LevelIcon level={props.lessonLevel}/>
      <span className={styles.lesson}>{props.lessonTitle}</span>
    </NavLink> : null;
  return <div className={styles.breadcrumb}>
    {homeLink}
    {courseLink ? <span> / </span> : null}
    {courseLink ? courseLink : null}
    {lessonLink ? <span> / </span> : null}
    {lessonLink ? lessonLink : null}
  </div>;
}
BreadCrumb.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  })
};

function mapStateToProps(state, ownProps) {
  const {course, lesson, file} = ownProps.params;
  const lessonPath = file ? `./${course}/${lesson}/${file}.md` : '';
  const isReadme = (file && /README(_[a-z]{2})?/.test(file));
  let title = '';

  if(isReadme){
    title = state.context.readmeContext(lessonPath).frontmatter.title || '';
  }
  return {
    iconContext: state.context.iconContext,
    lessonLevel: lessonPath && !isReadme ? state.lessons[lessonPath].level : 0,
    lessonTitle: lessonPath && !isReadme ? state.lessons[lessonPath].title : title,
  };
}

export const BreadCrumbContainer = connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
