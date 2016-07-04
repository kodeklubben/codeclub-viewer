import React from 'react';
import { Link } from 'react-router';

const NavLink = React.createClass({

  render() {
    const check =  {
      color: 'white',
      textDecoration: 'none'
    };

    return <Link {...this.props} style={check} activeClassName="active"/>;
  }
});

export default NavLink;
