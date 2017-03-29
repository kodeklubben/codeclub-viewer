import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import {doNotShowAgain} from '../../localStorage';
import styles from './TeacherInfobox.scss';
import {CoursesContainer} from './Courses';
import {getInfo} from '../../util';

const WelcomeBox = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.object
    },

  render() {
    const url = [
      'http://kidsakoder.no/kodeklubben/',
      'http://kidsakoder.no/skole/'
    ];
    
    const welcomeBoxContext = require.context('onlyFrontmatter!lessonSrc/', false, /index\.md/);
    const welcomeBoxInfo = getInfo(welcomeBoxContext);
    
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
                {welcomeBoxInfo.student} 
                <br /><br />
                <a className={styles.link} href={url[0]}>Lær mer</a>
              </div>
              <div>
                <h3>Student</h3>
                {welcomeBoxInfo.student}
                <br /><br />
                <a className={styles.link} href={url[1]}>Lær mer</a>
              </div>
            </div>
            <Button onClick={doNotShowAgain}>x</Button>
            <Button onClick={() => this.context.router.push('/scratch/astrokatt/astrokatt')}>Start her!</Button>
            <Button>CONTINUE</Button>
          </div>
        </div>
      );
    }
    else {
      return (
      <div>
        <Button>CONTINUE</Button>
      </div>);
    }
  }

});

WelcomeBox.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
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
      