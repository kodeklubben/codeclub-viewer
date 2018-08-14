import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  container: {
    marginTop: 0,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing.unit,
    },
  },
  studentRoot: {
    backgroundColor: green[200],
  },
  teacherRoot: {
    backgroundColor: blue[200],
  },
  studentContent: {
    backgroundColor: green[50],
  },
  teacherContent: {
    backgroundColor: blue[50],
  },
});

const CollapsiblePanel = ({classes, defaultExpanded, children, header, isStudentMode}) => (
  <ExpansionPanel
    CollapseProps={{mountOnEnter: true, unmountOnExit: true}}
    className={classes.container} {...{defaultExpanded}}
  >
    <ExpansionPanelSummary
      classes={{root: isStudentMode ? classes.studentRoot : classes.teacherRoot}}
      expandIcon={<ExpandMoreIcon/>}
    >
      {header}
    </ExpansionPanelSummary>
    <ExpansionPanelDetails classes={{root: isStudentMode ? classes.studentContent : classes.teacherContent}}>
      {children}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

CollapsiblePanel.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool.isRequired,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  children: PropTypes.object.isRequired,

  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(CollapsiblePanel));
