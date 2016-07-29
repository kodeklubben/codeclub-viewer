import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

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
            <img className={styles.svg} src={'src/assets/graphics/github-teacher.svg'}/>
          </a>
        </Row>
        <Row>
          <div className={styles.divider}/>
        </Row>
      </div>
    );
  },

  render() {
    const url = {
      kidsakoder: 'http://kidsakoder.no/',
      archive: 'https://github.com/kodeklubben/kodeklubben.github.io/archive/master.zip',
      sponsor: 'http://kidsakoder.no/2015/07/03/kodeklubben-trondheim-utvikler-materiell-i-sommer/'
    };

    return (
      <Grid fluid={true} className={this.props.isStudentMode ? styles.containerStudent : styles.containerTeacher}>
        {this.props.isStudentMode ? null : this.getGitHubLink()}
        <Row className={styles.center}>
            <a className={styles.inline} href={url.kidsakoder}>kidsakoder.no</a>
            <a className={styles.inline} href={url.archive}>Last ned alle kurs som zip-fil</a>
        </Row>
        <Row className={styles.center}>
          <a href={url.sponsor}>
            <img className={styles.img} src={'src/assets/graphics/smn.jpg'}/>
          </a>
          <a href={url.sponsor}>
            <img className={styles.img} src={'src/assets/graphics/ibok.jpg'}/>
          </a>
        </Row>
      </Grid>
    );
  }

});

Footer.propTypes = {
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export const FooterContainer = connect(
  mapStateToProps,
)(withStyles(styles)(Footer));
