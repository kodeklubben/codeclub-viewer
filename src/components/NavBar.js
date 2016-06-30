import React, {PropTypes} from 'react';

import NavLink from './NavLink';
import styles from './NavBar.scss';

const NavBar = React.createClass({

  getInitialState() {
    return {
      teacher: false
    }
  },

  render() {
    const params = this.props.params;
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>{params.file}</NavLink> : null;

    return (
      <div className={styles.container}>
        <div className={styles.languageGroup}>
          <a className={styles.flag} href="#clicked">link</a>
          <a className={styles.flag} href="#clicked">link</a>
          <a className={styles.flag} href="#clicked">link</a>
        </div>
        <div className={styles.header}>
          <div className={styles.path}>
            <NavLink to="/" onlyActiveOnIndex>Front Page</NavLink>
            {courseLink ? <span> / {courseLink}</span> : null}
            {lessonLink ? <span> / {lessonLink}</span> : null}
          </div>
        </div>
      </div>
    );
  }

});

NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  })
};

export default NavBar;
