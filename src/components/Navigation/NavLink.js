import React from 'react';
import Link from 'react-router/lib/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './NavLink.scss';

const NavLink = ({className: c, ...rest}) => {
  return <Link {...rest} className={styles.linkBase + (c ? ' ' + c : '')} activeClassName="active"/>;
};

export default withStyles(styles)(NavLink);
