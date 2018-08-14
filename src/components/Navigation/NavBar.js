import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import BreadCrumb from './BreadCrumb';
import LanguageDropdown from './LanguageDropdown';
import ModeDropdown from './ModeDropdown';
import ContinueButton from './ContinueButton';

const container = {
  marginBottom: 30,
};

const styles = {
  studentContainer: {
    ...container,
    backgroundColor: green[200],
  },
  teacherContainer: {
    ...container,
    backgroundColor: blue[200],
  },
};

const NavBar = ({classes, params, isStudentMode}) => {
  return (
    <AppBar classes={{root: isStudentMode ? classes.studentContainer : classes.teacherContainer}} position='static'>
      <Toolbar disableGutters>
        <Grid container wrap='nowrap' alignItems='center' justify='space-between'>
          <Grid item><BreadCrumb {...params}/></Grid>
          <Grid item>
            <Grid container wrap='nowrap'>
              <ContinueButton {...params}/>
              <LanguageDropdown/>
              <ModeDropdown/>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),

  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(NavBar));
