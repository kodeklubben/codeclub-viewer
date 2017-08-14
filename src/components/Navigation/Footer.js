import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import {getTranslator} from '../../selectors/translate';
import styles from './Footer.scss';

const Footer = ({t, isStudentMode}) => {
  const url = {
    oppgaver: 'https://github.com/kodeklubben/oppgaver/',
    kidsakoder: 'http://kidsakoder.no/',
    archive: 'https://github.com/kodeklubben/kodeklubben.github.io/archive/master.zip',
    sponsor: 'http://kidsakoder.no/2015/07/03/kodeklubben-trondheim-utvikler-materiell-i-sommer/',
    excited: 'http://www.ntnu.edu/web/excited',
    ntnu_idi: 'https://www.ntnu.edu/idi/',
    uio_ifi: 'http://www.mn.uio.no/ifi/',
    teknograd: 'https://www.teknograd.no/'
  };

  return (
    <div>
      <Grid fluid={true} className={isStudentMode ? styles.containerStudent : styles.containerTeacher}>

      {isStudentMode ? null :
        <div>
          <Row className={styles.center}>
            <p>{t('footer.contribute')}</p>
          </Row>
          <Row className={styles.center}>
            <a href={url.oppgaver}>
              <img className={styles.svg} src={require('../../assets/graphics/github-teacher.svg')}/>
            </a>
          </Row>
          <Row>
            <div className={styles.divider}/>
          </Row>
        </div>}
        
        <Row className={styles.center}>
            <a className={styles.inline} href={url.kidsakoder}>kidsakoder.no</a>
            <a className={styles.inline} href={url.archive}>{t('footer.downloadZIP')}</a>
        </Row>
        <Row className={styles.center}>
          <a href={url.sponsor} target="_blank">
            <img className={styles.img} src={require('../../assets/graphics/smn.jpg')}/>
          </a>
          <a href={url.sponsor} target="_blank">
            <img className={styles.img} src={require('../../assets/graphics/ibok.jpg')}/>
          </a>
          <a href={url.teknograd} target="_blank">
            <img className={styles.img} src={require('../../assets/graphics/teknograd.png')}/>
          </a>
          <a href={url.ntnu_idi} target="_blank">
            <img className={styles.img} src={require('../../assets/graphics/ntnu_idi.png')}/>
          </a>
          <a href={url.excited} target="_blank">
            <img className={styles.img} src={require('../../assets/graphics/excITEd.png')}/>
          </a>
          <a href={url.uio_ifi} target="_blank">
            <img className={styles.img} src={require('../../assets/graphics/uio_ifi.png')}/>
          </a>
        </Row>
      </Grid>
    </div>
  );
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

export const FooterContainer = connect(
  mapStateToProps
)(withStyles(styles)(Footer));
