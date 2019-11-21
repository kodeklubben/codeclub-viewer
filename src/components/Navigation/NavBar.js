import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Drawer, Hidden, IconButton, Link, List, ListItem, Divider, DialogTitle} from '@material-ui/core';
import {getTranslator} from '../../selectors/translate';
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

  const t = useSelector(state => getTranslator(state));

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
    <React.Fragment>
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
              <Hidden implementation='css' lgUp>
                <ListItem button component={Link} href='https://kidsakoder.no/om-lkk'>
                  {t('navbar.lkknav.aboutlkk')}
                </ListItem>
                <ListItem button component={Link} href='https://kidsakoder.no/kontakt'>
                  {t('navbar.lkknav.contact')}
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  href='https://www.kidsakoder.no/om-lkk/personvern-i-laer-kidsa-koding-og-kodeklubben'
                >
                  {t('navbar.lkknav.privacy')}
                </ListItem>
                <ListItem button component={Link} href='https://kidsakoder.no/nyheter'>
                  {t('navbar.lkknav.news')}
                </ListItem>
                <ListItem button component={RouterLink} to='/'>
                  {t('navbar.lkknav.lessons')}
                </ListItem>
                <ListItem button component={Link} href='https://forum.kidsakoder.no'>
                  {t('navbar.lkknav.forum')}
                </ListItem>
                <ListItem button component={Link} href='https://kidsakoder.no/kodeklubben'>
                  {t('navbar.lkknav.codeclub')}
                </ListItem>
                <ListItem button component={Link} href='https://kidsakoder.no/skole'>
                  {t('navbar.lkknav.school')}
                </ListItem>
                <ListItem button component={Link} href='https://kidsakoder.no/kodetimen'>
                  {t('navbar.lkknav.codehour')}
                </ListItem>
                <ListItem button component={Link} href='https://kidsakoder.no/bidra'>
                  {t('navbar.lkknav.contribute')}
                </ListItem>
                <Divider/>
              </Hidden>
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
    </React.Fragment>
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
