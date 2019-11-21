import React from 'react';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Link, Hidden, List, ListItem, Paper} from '@material-ui/core';
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
  link: {
    marginRight: theme.spacing(3),
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    maxWidth: 160,
    boxShadow: theme.shadows[5],
    zIndex: 9999,
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

  const t = useSelector(state => getTranslator(state));
  const showDarkMode = useSelector(state => state.showDarkMode);

  return (
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
      <Hidden implementation='css' mdDown>
        <Link className={classes.dropdown} href='https://kidsakoder.no/om-lkk'>{t('navbar.lkknav.aboutlkk')}</Link>
        <Paper className={classes.dropdownContent}>
          <List>
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
          </List>
        </Paper>
        <Link className={classes.link} href='https://kidsakoder.no/nyheter'>{t('navbar.lkknav.news')}</Link>
        <Link className={classes.link} component={RouterLink} to='/'>{t('navbar.lkknav.lessons')}</Link>
        <Link className={classes.link} href='https://forum.kidsakoder.no'>{t('navbar.lkknav.forum')}</Link>
        <Link className={classes.link} href='https://kidsakoder.no/kodeklubben'>{t('navbar.lkknav.codeclub')}</Link>
        <Link className={classes.link} href='https://kidsakoder.no/skole'>{t('navbar.lkknav.school')}</Link>
        <Link className={classes.link} href='https://kidsakoder.no/kodetimen'>{t('navbar.lkknav.codehour')}</Link>
        <Link className={classes.link} href='https://kidsakoder.no/bidra'>{t('navbar.lkknav.contribute')}</Link>
      </Hidden>
    </div>
  );
};

export default LkkNavBar;
