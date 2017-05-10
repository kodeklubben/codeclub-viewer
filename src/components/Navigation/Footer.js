import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import {getTranslator} from '../../selectors/translate';

import styles from './Footer.scss';

const Footer = React.createClass({

  getGitHubLink() {
    const url = {
      oppgaver: 'https://github.com/kodeklubben/oppgaver/'
    };

    return (
      <div>
        <Row className={styles.center}>
          <p>Bidra?</p>
        </Row>
        <Row className={styles.center}>
          <a href={url.oppgaver}>
            <img className={styles.svg} src={require('../../assets/graphics/github-teacher.svg')}/>
          </a>
        </Row>
        <Row>
          <div className={styles.divider}/>
        </Row>
      </div>
    );
  },

  render() {
    const {isStudentMode, t} = this.props;
    const url = {
      kidsakoder: 'http://kidsakoder.no/',
      archive: 'https://github.com/kodeklubben/kodeklubben.github.io/archive/master.zip',
      sponsor: 'http://kidsakoder.no/2015/07/03/kodeklubben-trondheim-utvikler-materiell-i-sommer/',
      excited: 'http://www.ntnu.edu/web/excited',
      ntnu_idi: 'https://www.ntnu.edu/idi/',
      uio_ifi: 'http://www.mn.uio.no/ifi/',
      teknograd: 'https://www.teknograd.no/'
    };

    return (
      <Grid fluid={true} className={this.props.isStudentMode ? styles.containerStudent : styles.containerTeacher}>
        {this.props.isStudentMode ? null : this.getGitHubLink()}
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
    );
  }

});

Footer.propTypes = {
  isStudentMode: PropTypes.bool,
  t: PropTypes.func

};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state)
  };
}

export const FooterContainer = connect(
  mapStateToProps
)(withStyles(styles)(Footer));
