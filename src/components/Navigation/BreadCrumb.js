import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {capitalize} from '../../util';

const BreadCrumb = ({params, lessonLevel}) => {
  const homeLink = <NavLink to='/' onlyActiveOnIndex>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;
  const courseLink = params.course ?
    <NavLink to={`/${params.course}`} className={styles.lessonLink}>
      <img className={styles.courseIcon} src={'./' + params.course + '/logo-black.png'}/>
      <span className={styles.lesson}>{capitalize(params.course)}</span>
    </NavLink> : null;
  const lessonLink = params.course && params.lesson && params.file ?
    <NavLink to={`/${params.course}/${params.lesson}/${params.file}`} className={styles.lessonLink}>
      <LevelIcon level={lessonLevel}/>
      <span className={styles.lesson}>{capitalize(params.course)}</span>
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
  lessonLevel: PropTypes.number.isRequired
};

function mapStateToProps(state, {params}) {
  const lessonPath = params.file ? `./${params.course}/${params.lesson}/${params.file}.md` : '';
  const isReadme = (params.file && /README(_[a-z]{2})?/.test(params.file));
  let level = 0;

  if(isReadme){
    level = state.context.readmeContext(lessonPath).frontmatter.level || 0;
  }
  return {
    lessonLevel: lessonPath && !isReadme ? state.lessons[lessonPath].level : level
  };
}

export default connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
