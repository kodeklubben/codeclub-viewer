import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Drawer, IconButton, List, Toolbar, Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ContinueButton from './ContinueButton';
import DyslexiaSwitch from './DyslexiaSwitch';
import DarkModeSwitch from './DarkModeSwitch';
import LanguageList from './LanguageList';
import ModeList from './ModeList';
import GithubLink from './GithubLink';
import BreadCrumbs from './BreadCrumbs';

const useStyles = makeStyles(theme => ({
  hide: {
    '@media print': {
      display: 'none',
    },
  },
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  paper: {
    background: theme.palette.secondary.main,
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

  const {course, lesson, file} = params;

  return (
    <AppBar color='secondary' className={classes.hide}>
      <Toolbar className={classes.root}> 
        <BreadCrumbs {...{course, lesson, file}}/>
        <ContinueButton {...{course}}/>
        <IconButton size='small' onClick={toggleDrawer()} aria-label='menu'>
          <MenuIcon color='primary'/>
        </IconButton>
        <Drawer classes={{ paper: classes.paper }} open={showDrawer} anchor='right' onClose={toggleDrawer()}>
          <List>
            <LanguageList/>
            <Divider/>
            <ModeList/>
            <Divider/>
            <DyslexiaSwitch/>
            <Divider/>
            <DarkModeSwitch/>
            <Divider/>
            <GithubLink/>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
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
