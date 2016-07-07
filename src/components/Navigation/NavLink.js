import React from 'react';
import {Link} from 'react-router';

import styles from './NavBar.scss';

const NavLink = React.createClass({

  render() {
    return <Link {...this.props} className={styles.navPath} activeClassName="active"/>;
  }
});

export default NavLink;
