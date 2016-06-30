import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import NavLink from './NavLink';
import styles from './NavBar.scss';

const NavBar = React.createClass({

  render() {
    const params = this.props.params;
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>{params.file}</NavLink> : null;

    return (
      <div className={styles.container}>
        <NavLink to="/" onlyActiveOnIndex>Home</NavLink>
        {courseLink ? <span> / {courseLink}</span> : null}
        {lessonLink ? <span> / {lessonLink}</span> : null}
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

export default withStyles(styles)(NavBar);