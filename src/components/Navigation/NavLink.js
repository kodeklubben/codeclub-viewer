import React from 'react';
import {Link} from 'react-router';

const NavLink = React.createClass({

  render() {
    const styles =  {
      color: '#4f7548',
      textDecoration: 'none'
    };

    return <Link {...this.props} style={styles} activeClassName="active"/>;
  }
});

export default NavLink;
