import React, { PropTypes } from 'react';

import NavLink from './NavLink';
import style from './nav.scss';

const NavBar = React.createClass({

  render() {
    const params = this.props.params;
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>{params.file}</NavLink> : null;

    return (
      <div className={style.container}>
        <NavLink to="/" onlyActiveOnIndex>Home</NavLink>
        {courseLink ? <span> / {courseLink}</span> : null}
        {lessonLink ? <span> / {lessonLink}</span> : null}
      </div>
    );
  }

});

NavBar.PropTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  })
};

export default NavBar;
