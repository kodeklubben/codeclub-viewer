import React, {PropTypes} from 'react';

import NavLink from './NavLink';
import style from './navbar.scss';

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
      <div className={style.container}>
        <div className={style.languageGroup}>
          <a className={style.language} href="#clicked">link</a>
          <a className={style.language} href="#clicked">link</a>
          <a className={style.language} href="#clicked">link</a>
        </div>
        <div className={style.header}>
          <div className={style.path}>
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
