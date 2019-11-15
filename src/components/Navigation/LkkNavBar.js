import React from 'react';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {
  Slide, useScrollTrigger, Link, Hidden, Drawer, List, IconButton, ListItem, Paper
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../../selectors/translate';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    maxWidth: '100%',
    width: 250,
    height: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  link: {
    marginRight: theme.spacing(3),
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    maxWidth: 160,
    boxShadow: theme.shadows[5],
    zIndex: 9999,
    padding: theme.spacing(2),
    '&:hover': {
      display: 'block',
    },
  },
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    marginRight: theme.spacing(3),
    '&:hover + $dropdownContent': {
      display: 'block',
    },
  },
}));

const LkkNavBar = () => {
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

  const t = useSelector(state => getTranslator(state));
  const showDarkMode = useSelector(state => state.showDarkMode);

  return (
    <Slide direction='down' in={!useScrollTrigger()}>
      <div className={classes.root}>
        <Link href='https://kidsakoder.no'>
          <img
            className={classes.image}
            alt={'LKK logo'}
            src={showDarkMode ?
              require('../../assets/graphics/lkk_logo_white.png')
              :
              require('../../assets/graphics/lkk_logo_black.png')
            }/>
        </Link>
        <div>
          <Hidden initialWidth='lg' mdDown>
            <Link className={classes.dropdown} href='https://kidsakoder.no/om-lkk'>{t('navbar.lkknav.aboutlkk')}</Link>
            <Paper className={classes.dropdownContent}>
              <Link href='https://kidsakoder.no/kontakt'>
                {t('navbar.lkknav.contact')}
              </Link>
              <br/>
              <br/>
              <Link href='https://www.kidsakoder.no/om-lkk/personvern-i-laer-kidsa-koding-og-kodeklubben'>
                {t('navbar.lkknav.privacy')}
              </Link>
            </Paper>
            <Link className={classes.link} href='https://kidsakoder.no/nyheter'>{t('navbar.lkknav.news')}</Link>
            <Link className={classes.link} component={RouterLink} to='/'>{t('navbar.lkknav.lessons')}</Link>
            <Link className={classes.link} href='https://forum.kidsakoder.no'>{t('navbar.lkknav.forum')}</Link>
            <Link className={classes.link} href='https://kidsakoder.no/kodeklubben'>{t('navbar.lkknav.codeclub')}</Link>
            <Link className={classes.link} href='https://kidsakoder.no/skole'>{t('navbar.lkknav.school')}</Link>
            <Link className={classes.link} href='https://kidsakoder.no/kodetimen'>{t('navbar.lkknav.codehour')}</Link>
            <Link className={classes.link} href='https://kidsakoder.no/bidra'>{t('navbar.lkknav.contribute')}</Link>
          </Hidden>
          <Hidden initialWidth='xs' lgUp>
            <IconButton className={classes.button} size='small' onClick={toggleDrawer()} aria-label='menu'>
              <MenuIcon color='primary'/>
            </IconButton>
            <Drawer
              classes={{ paper: classes.paper }}
              onClick={handleClose}
              open={showDrawer}
              anchor='right'
              onClose={toggleDrawer()}
            >
              <List>
                <ListItem>
                  <Link className={classes.link} href='https://kidsakoder.no/om-lkk'>
                    {t('navbar.lkknav.aboutlkk')}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} href='https://kidsakoder.no/kontakt'>
                    {t('navbar.lkknav.contact')}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    className={classes.link}
                    href='https://www.kidsakoder.no/om-lkk/personvern-i-laer-kidsa-koding-og-kodeklubben'
                  >
                    {t('navbar.lkknav.privacy')}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} href='https://kidsakoder.no/nyheter'>{t('navbar.lkknav.news')}</Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} component={RouterLink} to='/'>{t('navbar.lkknav.lessons')}</Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} href='https://forum.kidsakoder.no'>{t('navbar.lkknav.forum')}</Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} href='https://kidsakoder.no/kodeklubben'>
                    {t('navbar.lkknav.codeclub')}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} href='https://kidsakoder.no/skole'>{t('navbar.lkknav.school')}</Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} href='https://kidsakoder.no/kodetimen'>
                    {t('navbar.lkknav.codehour')}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link className={classes.link} href='https://kidsakoder.no/bidra'>
                    {t('navbar.lkknav.contribute')}
                  </Link>
                </ListItem>
              </List>
            </Drawer>
          </Hidden>
        </div>
      </div>
    </Slide>
  );
};

export default LkkNavBar;
