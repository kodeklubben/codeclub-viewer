import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {doNotShowAgain} from '../../localStorage';
import styles from './TeacherInfobox.scss';
import {CoursesContainer} from './Courses';
import {getInfo} from '../../util';
import ButtonItem from '../ButtonItem';

const WelcomeBox = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.object
    },

  render() {
    const url = [
      'http://kidsakoder.no/kodeklubben/'
    ];
    
    const welcomeBoxContext = require.context('onlyFrontmatter!lessonSrc/', false, /index\.md/);
    const welcomeBoxInfo = getInfo(welcomeBoxContext);

    if(this.props.userProgress === "false") {
      return (
        <div className={styles.center}>
          <div className={styles.infoBox}>
            <h3 className={styles.center}>Hei! Du er nå i elevmodus</h3>
            <Button className={styles.stickToRight} onClick={doNotShowAgain}>
              <Glyphicon glyph="remove"/>
            </Button>
            <br />
            Er du ikke en elev? Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
            Du kan også velge å skjule denne boksen for alltid, ved å trykke på krysset i hjørnet
            <br /><br />
            {welcomeBoxInfo.student}
            <br />
            <a className={styles.link} href={url[0]} target="_blank">Lær mer om å drive kodeklubb</a>
            <br /><br />
            <div className={styles.center}>
              {true ?
              <ButtonItem color='green' onClick={() => this.context.router.push('scratch')}>
                Start her!
              </ButtonItem>
              :
              <ButtonItem color='blue'>Fortsett...</ButtonItem>}
            </div>            
          </div>
        </div>
      );
    }
    else {
      return (
      <div className={styles.center}>
       {true ?
        <ButtonItem color='green' onClick={() => this.context.router.push('scratch')}>
          Start her!
        </ButtonItem>
        :
        <ButtonItem color='blue'>Fortsett...</ButtonItem>}
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
      