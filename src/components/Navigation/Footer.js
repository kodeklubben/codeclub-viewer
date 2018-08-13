import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import {getTranslator} from '../../selectors/translate';
import DyslexiaSwitch from './DyslexiaSwitch';

const container = {
  padding: '15px',
  marginTop: '100px',
  textAlign: 'center',
  '@media print': {
    display: 'none',
  },
};

const styles = {
  studentContainer: {
    ...container,
    backgroundColor: green[200],
  },
  teacherContainer: {
    ...container,
    backgroundColor: blue[200],
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
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  githubText: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: 'black',
    },
  },
  sponsors: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
    <div className={classes.sponsors}>
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
    </div>
  );

  const github = (
    <div className={classes.github}>
      <a href={url.wiki} target='_blank' rel='noopener'>
        <img className={classes.githubIcon} src={require('../../assets/graphics/github.png')}
          alt={'GitHub'}
        />
      </a>
      <Typography variant='title' paragraph>
        <a className={classes.githubText} href={url.wiki} target='_blank' rel='noopener'>{t('footer.contribute')}</a>
      </Typography>
    </div>
  );

  return (
    <div role='contentinfo' className={isStudentMode ? classes.studentContainer : classes.teacherContainer}>
      {github}
      <DyslexiaSwitch/>
      <Divider/>
      {sponsors}
    </div>
  );
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
