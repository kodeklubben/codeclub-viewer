import React from 'react';
import {Link} from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './NavLink.scss';

const NavLink = React.createClass({

  render() {
    return <Link {...this.props} className={styles.navPath} activeClassName="active"/>;
  }
});

export default withStyles(styles)(NavLink);
