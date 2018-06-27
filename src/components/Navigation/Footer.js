import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from '@material-ui/core/Grid';
import {getTranslator} from '../../selectors/translate';
import styles from './Footer.scss';

const Footer = ({t, isStudentMode}) => {
  const url = {
    oppgaver: 'https://github.com/kodeklubben/oppgaver/',
    sparebank: 'https://www.sparebank1.no',
    ibok: 'https://ibok.no/',
    excited: 'http://www.ntnu.edu/web/excited',
    ntnu_idi: 'https://www.ntnu.edu/idi/',
    uio_ifi: 'http://www.mn.uio.no/ifi/',
    teknograd: 'https://www.teknograd.no/'
  };

  const sponsors = (
    <div className={styles.sponsors}>
      <a href={url.sparebank} target="_blank">
        <img className={styles.img} src={require('../../assets/graphics/smn.jpg')}
          alt={'SpareBank1'}
        />
      </a>
      <a href={url.ibok} target="_blank">
        <img className={styles.img} src={require('../../assets/graphics/ibok.jpg')}
          alt={'Ibok'}
        />
      </a>
      <a href={url.teknograd} target="_blank">
        <img className={styles.img} src={require('../../assets/graphics/teknograd.png')}
          alt={'Teknograd'}
        />
      </a>
      <a href={url.tekna} target="_blank">
        <img className={styles.img} src={require('../../assets/graphics/tekna.jpg')}
          alt={'Tekna'}
        />
      </a>
      <a href={url.ntnu_idi} target="_blank">
        <img className={styles.img} src={require('../../assets/graphics/ntnu_idi.png')}
          alt={'NTNU institutt for datateknologi og informatikk'}
        />
      </a>
      <a href={url.excited} target="_blank">
        <img className={styles.img} src={require('../../assets/graphics/excITEd.png')}
          alt={'excited'}
        />
      </a>
      <a href={url.uio_ifi} target="_blank">
        <img className={styles.img} src={require('../../assets/graphics/uio_ifi.png')}
          alt={'UIO institutt for informatikk'}
        />
      </a>
    </div>);

  return (
    <Grid container direction='column' alignItems='center' justify='center'
      className={isStudentMode ? styles.containerStudent : styles.containerTeacher}>
      <a className={styles.githubIcon} href={url.oppgaver} target="_blank">
        <img className={styles.svg} src={require('../../assets/graphics/github.png')}
          alt={'GitHub'}
        />
      </a>
      <a className={styles.contribute} href={url.oppgaver} target="_blank">{t('footer.contribute')}</a>
      <div className={styles.divider}/>
      {sponsors}
    </Grid>);
};

Footer.propTypes = {
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
