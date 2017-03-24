import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import {doNotShowAgain} from '../../localStorage';
import styles from './TeacherInfobox.scss';

const WelcomeBox = React.createClass({

  render() {
    if(this.props.userProgress === "false") {
      return (
        <div className={styles.infoBoxContainer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBoxRow}>
              <div className={styles.infoBoxItem}>
                Du er nå i elevmodus!
                <br /><br />
                Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
                Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
              </div>
            </div>
            <div className={styles.infoBoxRow}>
              <div>
                <h3>Elev</h3>
                Student Student Student Student Student Student Student
                Student Student Student Student Student Student Student
                Student Student Student Student Student Student Student
                Student Student Student Student Student Student Student 
                <br /><br />
              </div>
              <div>
                <h3>Student</h3>
                Student Student Student Student Student Student Student
                Student Student Student Student Student Student Student
                Student Student Student Student Student Student Student
                Student Student Student Student Student Student Student
                <br /><br />
              </div>
            </div>
            <Button onClick={doNotShowAgain}>x</Button>
          </div>
        </div>
      );
    }
    else {
      return (
      <div></div>);
    }
  }

});

WelcomeBox.propTypes = {
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
)(withStyles(styles)(WelcomeBox));
      