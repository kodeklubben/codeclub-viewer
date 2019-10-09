import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './NavLink.scss';

const NavLink = ({className, to, ...rest}) => {
  useStyles(styles);
  const classes = (to ? styles.linkBase : styles.spanBase) + (className ? ' ' + className : '');
  return to ?
    <Link {...rest} className={classes} to={to}/> :
    <span className={classes}>{rest.children}</span>;
};

NavLink.propTypes = {
  className: PropTypes.string
};

export default NavLink;
