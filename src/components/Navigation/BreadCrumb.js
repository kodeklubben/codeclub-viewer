import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {capitalize} from '../../util';

export const BreadCrumb = ({params, iconContext, lessonLevel, lessonTitle}) => {
  const homeLink = <NavLink to='/' onlyActiveOnIndex>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;
  const courseLink = params.course ?
    <NavLink to={`/${params.course}`} className={styles.lessonLink}>
      <img className={styles.courseIcon} src={iconContext('./' + params.course + '/logo-black.png')}/>
      <span className={styles.lesson}>{capitalize(params.course)}</span>
    </NavLink> : null;
  const lessonLink = params.course && params.lesson && params.file ?
    <NavLink to={`/${params.course}/${params.lesson}/${params.file}`} className={styles.lessonLink}>
      <LevelIcon level={lessonLevel}/>
      <span className={styles.lesson}>{lessonTitle}</span>
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
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
  iconContext: PropTypes.func,
  lessonLevel: PropTypes.number,
  lessonTitle: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  const {course, lesson, file} = ownProps.params;
  const lessonPath = file ? `./${course}/${lesson}/${file}.md` : '';
  const isReadme = (file && /README(_[a-z]{2})?/.test(file));
  let title = '';
  let level = 0;

  if(isReadme){
    title = state.context.readmeContext(lessonPath).frontmatter.title || '';
    level = state.context.readmeContext(lessonPath).frontmatter.level || 0;
  }
  return {
    iconContext: state.context.iconContext,
    lessonLevel: lessonPath && !isReadme ? state.lessons[lessonPath].level : level,
    lessonTitle: lessonPath && !isReadme ? state.lessons[lessonPath].title : title,
  };
}

export const BreadCrumbContainer = connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
