import React from 'react';
import {Link} from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './NavLink.scss';

const NavLink = React.createClass({
  render() {
    const {className: c, ...rest} = this.props;
    return <Link {...rest} className={styles.linkBase + (c ? ' ' + c : '')} activeClassName="active"/>;
  }

});

export default withStyles(styles)(NavLink);