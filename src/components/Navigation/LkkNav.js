import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {getTranslator} from '../../selectors/translate';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    backgroundColor: grey[100],
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  linkBar: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      color: green[800],
    },
  },
  currentLink: {
    color: green[800],
    textDecoration: 'none',
  },
  linkMenu: {
    backgroundColor: grey[900],
    '&:hover, &:focus': {
      backgroundColor: green[800],
    },
  },
  white: {
    color: 'white',
  },
  alwaysGreen: {
    backgroundColor: green[800],
    '&:hover': {
      backgroundColor: green[800],
    },
  },
  blackBackground: {
    backgroundColor: grey[900],
  }
});

class LkkNav extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({open: !state.open}));
  };

  render() {
    const {classes, t} = this.props;
    const {open} = this.state;
    const className = classes.link;
    const linkBar = (
      <Typography variant='subheading' className={classes.linkBar}>
        <a {...{className}} href='https://kidsakoder.no/om-lkk/'>{t('navbar.lkknav.aboutlkk')}</a>
        <a {...{className}} href='https://kidsakoder.no/nyheter/'>{t('navbar.lkknav.news')}</a>
        <Link className={classes.currentLink} to={'/'}>{t('navbar.lkknav.lessons')}</Link>
        <a {...{className}} href='https://kidsakoder.no/kodeklubben/kodeklubboversikt/'>
          {t('navbar.lkknav.findcodeclub')}
        </a>
        <a {...{className}} href='https://kidsakoder.no/kodeklubben/'>{t('navbar.lkknav.codeclub')}</a>
        <a {...{className}} href='https://kidsakoder.no/skole/'>{t('navbar.lkknav.school')}</a>
        <a {...{className}} href='https://kidsakoder.no/kodetimen/'>{t('navbar.lkknav.codehour')}</a>
        <a {...{className}} href='https://kidsakoder.no/bidra/'>{t('navbar.lkknav.contribute')}</a>
      </Typography>
    );
    const linkMenu = (
      <div>
        <ListItem button onClick={this.handleClick} classes={{root: classes.linkMenu}}>
          <Grid container justify='space-around'>
            <ListItemText classes={{primary: classes.white}} primary={t('navbar.menu')}/>
            {open ? <ExpandLessIcon className={classes.white}/> : <ExpandMoreIcon className={classes.white}/>}
          </Grid>
        </ListItem>
        <Collapse in={open} mountOnEnter unmountOnExit>
          <List component='nav' className={classes.blackBackground}>
            <ListItem classes={{root: classes.linkMenu}} button component='a' href='https://kidsakoder.no/om-lkk/'>
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.aboutlkk')}/>
            </ListItem>
            <ListItem classes={{root: classes.linkMenu}} button component='a' href='https://kidsakoder.no/nyheter/'>
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.news')}/>
            </ListItem>
            <ListItem classes={{root: classes.alwaysGreen}} button component={Link} to={'/'}>
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.lessons')}/>
            </ListItem>
            <ListItem
              classes={{root: classes.linkMenu}}
              button component='a' href='https://kidsakoder.no/kodeklubben/kodeklubboversikt/'
            >
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.findcodeclub')}/>
            </ListItem>
            <ListItem classes={{root: classes.linkMenu}} button component='a' href='https://kidsakoder.no/kodeklubben/'>
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.codeclub')}/>
            </ListItem>
            <ListItem classes={{root: classes.linkMenu}} button component='a'  href='https://kidsakoder.no/skole/'>
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.school')}/>
            </ListItem>
            <ListItem classes={{root: classes.linkMenu}} button component='a' href='https://kidsakoder.no/kodetimen/'>
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.codehour')}/>
            </ListItem>
            <ListItem classes={{root: classes.linkMenu}} button component='a' href='https://kidsakoder.no/bidra/'>
              <ListItemText classes={{primary: classes.white}} primary={t('navbar.lkknav.contribute')}/>
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
    return (
      <div className={classes.container} role='navigation'>
        <Grid container direction='column'>
          <Grid item>
            <a href='https://kidsakoder.no'>
              <img src={require('../../assets/graphics/LKK_small.png')} alt={'LKK logo'}/>
            </a>
          </Grid>
          <Hidden smDown>{linkBar}</Hidden>
          <Hidden mdUp>{linkMenu}</Hidden>
        </Grid>
      </div>
    );
  }
}

LkkNav.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(LkkNav));
