import React from 'react';
import { Link } from 'react-router';

const NavLink = React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>;
  }
});

export default NavLink;
