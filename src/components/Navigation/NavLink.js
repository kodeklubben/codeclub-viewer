import React from 'react';
import {Link} from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './NavLink.scss';

const NavLink = React.createClass({
  render() {
    const {className, ...rest} = this.props;
    return <Link {...rest} className={styles.linkBase + ' ' + className} activeClassName="active"/>;
  }

});

export default withStyles(styles)(NavLink);