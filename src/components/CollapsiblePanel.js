import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  studentRoot: {
    fontSize: '1.5em',
    backgroundColor: '#b1daae',
  },
  teacherRoot: {
    fontSize: '1.5em',
    backgroundColor: '#a3cccb',
  },
  studentContent: {
    backgroundColor: '#eef7ee',
  },
  teacherContent: {
    backgroundColor: '#eff6f6',
  },
};

const CollapsiblePanel = ({classes, defaultExpanded, children, header, isStudentMode}) => (
  <ExpansionPanel {...{defaultExpanded}}>
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
