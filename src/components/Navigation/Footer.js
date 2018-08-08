import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {getTranslator} from '../../selectors/translate';
import DyslexiaSwitch from './DyslexiaSwitch';

const container = {
  padding: '15px',
  marginTop: '100px',
  '@media print': {
    display: 'none',
  },
};

const styles = {
  studentContainer: {
    ...container,
    backgroundColor: '#b1daae',
  },
  teacherContainer: {
    ...container,
    backgroundColor: '#a3cccb',
  },
  image: {
    margin: '10px 5px 20px',
    width: 'auto',
    height: '50px',
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '10px 10px 20px 10px rgba(0, 0, 0, 0.5)',
    },
  },
  githubIcon: {
    width: '100px',
    height: 'auto',
  },
  githubText: {
    fontSize: '1.5em',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
      color: 'black',
    },
  },
  sponsors: {
    marginTop: '20px',
    overflow: 'hidden',
  },
};

const Footer = ({classes, t, isStudentMode}) => {
  const url = {
    wiki: 'https://github.com/kodeklubben/oppgaver/wiki',
    sparebank: 'https://www.sparebank1.no',
    ibok: 'https://ibok.no/',
    excited: 'http://www.ntnu.edu/web/excited',
    ntnu_idi: 'https://www.ntnu.edu/idi/',
    uio_ifi: 'http://www.mn.uio.no/ifi/',
    teknograd: 'https://www.teknograd.no/',
    tekna: 'https://www.tekna.no/'
  };

  const sponsors = (
    <Grid item className={classes.sponsors}>
      <a href={url.sparebank} target='_blank' rel='noopener'>
        <img className={classes.image} src={require('../../assets/graphics/smn.jpg')}
          alt={'SpareBank1'}
        />
      </a>
      <a href={url.ibok} target='_blank' rel='noopener'>
        <img className={classes.image} src={require('../../assets/graphics/ibok.jpg')}
          alt={'Ibok'}
        />
      </a>
      <a href={url.teknograd} target='_blank' rel='noopener'>
        <img className={classes.image} src={require('../../assets/graphics/teknograd.png')}
          alt={'Teknograd'}
        />
      </a>
      <a href={url.tekna} target='_blank' rel='noopener'>
        <img className={classes.image} src={require('../../assets/graphics/tekna.jpg')}
          alt={'Tekna'}
        />
      </a>
      <a href={url.ntnu_idi} target='_blank' rel='noopener'>
        <img className={classes.image} src={require('../../assets/graphics/ntnu_idi.png')}
          alt={'NTNU institutt for datateknologi og informatikk'}
        />
      </a>
      <a href={url.excited} target='_blank' rel='noopener'>
        <img className={classes.image} src={require('../../assets/graphics/excITEd.png')}
          alt={'excited'}
        />
      </a>
      <a href={url.uio_ifi} target='_blank' rel='noopener'>
        <img className={classes.image} src={require('../../assets/graphics/uio_ifi.png')}
          alt={'UIO institutt for informatikk'}
        />
      </a>
    </Grid>
  );

  const github = (
    <Grid item>
      <a href={url.wiki} target='_blank' rel='noopener'>
        <img className={classes.githubIcon} src={require('../../assets/graphics/github.png')}
          alt={'GitHub'}
        />
      </a>
      <a className={classes.githubText} href={url.wiki} target='_blank' rel='noopener'>{t('footer.contribute')}</a>
    </Grid>
  );

  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      role='contentinfo'
      className={isStudentMode ? classes.studentContainer : classes.teacherContainer}
    >
      {github}
      <Grid item><DyslexiaSwitch/></Grid>
      <Grid item><Divider/></Grid>
      {sponsors}
    </Grid>);
};

Footer.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(Footer));
