import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Drawer, IconButton, List, Divider, DialogTitle} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ContinueButton from './ContinueButton';
import DyslexiaSwitch from './DyslexiaSwitch';
import DarkModeSwitch from './DarkModeSwitch';
import LanguageList from './LanguageList';
import GithubLink from './GithubLink';
import BreadCrumbs from './BreadCrumbs';
import LkkNavBar from './LkkNavBar';

const useStyles = makeStyles(theme => ({
  hide: {
    '@media print': {
      display: 'none',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
  },
  paper: {
    background: theme.palette.secondary.main,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const NavBar = ({params}) => {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = React.useState(false);

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowDrawer(!showDrawer);
  };
  
  const handleClose = () => {
    setShowDrawer(false);
  };

  const {course, lesson, file} = params;

  return (
    <div>
      <LkkNavBar/>
      <AppBar position='sticky' color='secondary' className={classes.hide}>
        <div className={classes.root}> 
          <BreadCrumbs {...{course, lesson, file}}/>
          <ContinueButton {...{course}}/>
          <IconButton size='small' onClick={toggleDrawer()} aria-label='menu'>
            <MenuIcon color='primary'/>
          </IconButton>
          <Drawer
            classes={{ paper: classes.paper }}
            open={showDrawer}
            anchor='right'
            onClose={toggleDrawer()}
          >
            <DialogTitle className={classes.closeButton}>
              <IconButton size='small' aria-label='close' onClick={handleClose}>
                <CloseIcon color='primary'/>
              </IconButton>
            </DialogTitle>
            <List>
              <LanguageList/>
              <Divider/>
              <DyslexiaSwitch/>
              <Divider/>
              <DarkModeSwitch/>
              <Divider/>
              <GithubLink/>
            </List>
          </Drawer>
        </div>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
};

export default NavBar;
