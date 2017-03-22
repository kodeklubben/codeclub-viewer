import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import {doNotShowAgain} from '../../localStorage';
import styles from './TeacherInfobox.scss';

const TeacherInfobox = React.createClass({

  render() {
    const url = {
      assistant: 'http://kidsakoder.no/kodeklubben/',
      teacher: 'http://kidsakoder.no/skole/'
    };
    
    if(this.props.userProgress === "false") {
      return (
        <div className={styles.infoBoxContainer}>
          <Collapse in={!this.props.isStudentMode}>
            <div className={styles.infoBox}>
              <div className={styles.infoBoxRow}>
                <div className={styles.infoBoxItem}>
                  Du er nå lærermodus!
                  <br /><br />
                  Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
                  Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
                </div>
              </div>
              <div className={styles.infoBoxRow}>
                <div>
                  <h3>Lærer</h3>
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  <br /><br />
                  <a className={styles.link} href={url.teacher}>Lær mer</a>
                </div>
                <div>
                  <h3>Veileder</h3>
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  <br /><br />
                  <a className={styles.link} href={url.assistant}>Lær mer</a>
                </div>
                <Button onClick={doNotShowAgain}>Ikke vis igjen</Button>
              </div>
            </div>
          </Collapse>
        </div>
      );
    }
    else {
      return (
      <div></div>);
    }
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
      