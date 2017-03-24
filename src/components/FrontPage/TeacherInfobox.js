import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import {doNotShowAgain} from '../../localStorage';
import styles from './TeacherInfobox.scss';

const TeacherInfobox = React.createClass({

  render() {
    const url = {
      assistant: 'http://kidsakoder.no/kodeklubben/',
      teacher: 'http://kidsakoder.no/skole/'
    };
    
    return (
      <div className={styles.infoBoxContainer}>
        {!this.props.isStudentMode ?
          <div className={styles.infoBox}>
            <div className={styles.infoBoxRow}>
              <div className={styles.infoBoxItem}>
                Du er nå i lærermodus!
                <br /><br />
                Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
                Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
              </div>
            </div>
            <div className={styles.infoBoxRow}>
              <div>
                <h3>Lærer</h3>
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                <br /><br />
                <a className={styles.link} href={url.teacher}>Lær mer</a>
              </div>
              <div>
                <h3>Veileder</h3>
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer Lærer
                <br /><br />
                <a className={styles.link} href={url.assistant}>Lær mer</a>
              </div>
            </div>
          </div>
      : null}
      </div>
    );
  }

});

TeacherInfobox.propTypes = {
  isStudentMode: PropTypes.bool,
  userProgress: PropTypes.string
};

function mapStateToProps(state) {
  return {
    userProgress: state.userProgress
  };
}

export default connect(
  mapStateToProps,
  {doNotShowAgain}
)(withStyles(styles)(TeacherInfobox));
      