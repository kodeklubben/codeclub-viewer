import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BreadCrumb from './BreadCrumb';
import LanguageDropdown from './LanguageDropdown';
import ModeDropdown from './ModeDropdown';
import ContinueButton from './ContinueButton';

const container = {
  marginBottom: '30px',
};

const styles = {
  studentContainer: {
    ...container,
    backgroundColor: '#b1daae',
  },
  teacherContainer: {
    ...container,
    backgroundColor: '#a3cccb',
  },
};

const NavBar = ({classes, params, isStudentMode}) => {
  return (
    <div role='banner'>
      <p>TEST</p>
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
    </div>
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
