import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SchoolIcon from '@material-ui/icons/School';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
    },
  },
  menuItemText: {
    marginLeft: theme.spacing.unit,
  },
  popper: {
    marginLeft: theme.spacing.unit,
    zIndex: 1,
  },
});


class ModeDropdown extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({open: !state.open}));
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes, t,  isStudentMode, setModeStudent, setModeTeacher} = this.props;
    const {open} = this.state;
    const modes = ['student', 'teacher'];
    const buttonTexts = {
      'student': t('general.student'),
      'teacher': t('general.teacher')
    };
    const mode = isStudentMode ? modes[0] : modes[1];
    const options = {
      'aria-owns': open ? 'mode-menu' : null,
      'aria-haspopup': true,
      variant: 'outlined',
      size: 'small',
      onClick: this.handleToggle,
      className: classes.button,
      buttonRef: node => {this.anchorEl = node;},
    };
    return (
      <div>
        <Button {...options}>
          {isStudentMode ? <EditIcon/> :  <SchoolIcon/>}
          <span className={classes.modeText}>
            {t('navbar.mode') + ':'}
          </span>
          <span className={classes.text}>
            {buttonTexts[mode]}
          </span>
        </Button>
        <Popper {...{open}} anchorEl={this.anchorEl} transition disablePortal className={classes.popper}>
          {({TransitionProps, placement}) => (
            <Grow {...TransitionProps} id='mode-menu' style={{transformOrigin: 'center top'}}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
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
                        <span className={classes.menuItemText}>
                          {buttonTexts[modeKey]}
                        </span>
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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
  t: getTranslator(state),
});

const mapDispatchToProps = {
  setModeStudent,
  setModeTeacher
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ModeDropdown));
