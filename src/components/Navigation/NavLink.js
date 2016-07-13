import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './NavLink.scss';

const NavLink = React.createClass({

  render() {
    return <Link {...this.props} className={this.props.isStudentMode ? styles.linkStudent : styles.linkTeacher}
      activeClassName="active"/>;
  }

});

NavLink.propTypes = {
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export default connect(
  mapStateToProps
)(withStyles(styles)(NavLink));
