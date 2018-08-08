import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SchoolIcon from '@material-ui/icons/School';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {getTranslator} from '../../selectors/translate';
import {setModeStudent, setModeTeacher} from '../../reducers/mode';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit,
    },
  },
  modeText: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  menuItemText: {
    marginLeft: theme.spacing.unit,
  },
});


class ModeDropdown extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = event => {
    this.setState({anchorEl: null});
  };

  render() {
    const {classes, t,  isStudentMode, setModeStudent, setModeTeacher} = this.props;
    const {anchorEl} = this.state;
    const modes = ['student', 'teacher'];
    const buttonTexts = {
      'student': t('general.student'),
      'teacher': t('general.teacher')
    };
    const mode = isStudentMode ? modes[0] : modes[1];
    const options = {
      'aria-owns': anchorEl ? 'mode-menu' : null,
      'aria-haspopup': true,
      variant: 'outlined',
      size: 'small',
      onClick: this.handleClick,
      className: classes.button,
    };
    return (
      <div>
        <Button {...options}>
          {isStudentMode ? <EditIcon/> :  <SchoolIcon/>}
          <span className={classes.modeText}>{t('navbar.mode') + ': '}</span>
          <span className={classes.text}>{buttonTexts[mode]}</span>
        </Button>
        <Menu
          id='mode-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {modes.map(modeKey =>
            <MenuItem
              key={modeKey}
              selected={mode === modeKey}
              onClick={() => {
                modeKey === 'student' ? setModeStudent() : setModeTeacher();
                this.handleClose();
              }}
            >
              {modeKey === 'teacher' ? <SchoolIcon/> : <EditIcon/>}
              <span className={classes.menuItemText}>{buttonTexts[modeKey]}</span>
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

ModeDropdown.propTypes = {
  //ownProps
  classes: PropTypes.object.isRequired,

  //mapStateToProps
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setModeStudent: PropTypes.func.isRequired,
  setModeTeacher: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state)
});

const mapDispatchToProps = {
  setModeStudent,
  setModeTeacher
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ModeDropdown));
