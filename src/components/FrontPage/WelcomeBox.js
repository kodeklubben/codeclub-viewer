import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
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
        <div className={styles.infoBoxContainer}>
          <Grid className={styles.infoBox} fluid={true}>
            <Row className={styles.center}>
              <h3 className={styles.tempClass}>
                Du er nå elevmodus!
                <Button onClick={doNotShowAgain}>x</Button>
              </h3>
              <div>
                Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
                Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
              </div>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <h3>Elev</h3>
                {welcomeBoxInfo.student}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <a className={styles.link} href={url[0]} target="_blank">Lær mer om å drive kodeklubb</a>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <div className={styles.buttonItem}>
                  {true ?
                  <ButtonItem color='green' onClick={() => this.context.router.push('/scratch/astrokatt/astrokatt')}>
                    Start her!
                  </ButtonItem>
                  :
                  <ButtonItem color='blue'>CONTINUE</ButtonItem>}
                </div>
              </Col>
            </Row>              
          </Grid>
        </div>
      );
    }
    else {
      return (
      <div className={styles.infoBoxContainer}>
       {true ?
        <ButtonItem color='green' onClick={() => this.context.router.push('/scratch/astrokatt/astrokatt')}>
          Start her!
        </ButtonItem>
        :
        <ButtonItem color='blue'>CONTINUE</ButtonItem>}
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
      