import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router/lib/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './NavLink.scss';

const NavLink = ({className, to, ...rest}) => {
  const classes = (to ? styles.linkBase : styles.spanBase) + (className ? ' ' + className : '');
  return to ?
    <Link {...rest} className={classes} to={to}/> :
    <span className={classes}>{rest.children}</span>;
};

NavLink.propTypes = {
  className: PropTypes.string
};

export default withStyles(styles)(NavLink);
