import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {getFilteredCourses, getFilteredExternalCourses} from '../selectors/course';
import CourseList from '../components/CourseList/CourseList';
import {LessonFilterContainer} from '../components/Filter/LessonFilter';
import ButtonItem from '../components/ButtonItem';
import styles from './FrontPage.scss';
import {changeMode} from '../action_creators';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

export const  FrontPage = React.createClass({

  getInitialState() {
    return {
      showMobileFilter: false
    };
  },

  render() {
    const hrefAssistant = 'http://kidsakoder.no/kodeklubben/';
    const hrefTeacher = 'http://kidsakoder.no/skole/';

    return (
      <Grid fluid={true}>
        {/* Front page title */}
        <Row>
          <div className={styles.title}>
            <span className={styles.t1}>kode</span><span className={styles.t2}>klubben_</span>
          </div>
        </Row>

        {/* Buttons */}
        <Row>
          <div className={styles.center}>
            <ButtonItem color='green' onClick={() => this.displayExercise}>
              Kom i gang!
            </ButtonItem>
            <ButtonItem color='blue' onClick={() => this.props.changeMode()}>
              Lærer/Veileder
            </ButtonItem>
          </div>
        </Row>

        {/* Collapse infobox */}
        <Row>
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
                  <a className={styles.link} href={hrefAssistant}>Lær mer</a>
                </div>
                <div>
                  <h3>Veileder</h3>
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  <br /><br />
                  <a className={styles.link} href={hrefTeacher}>Lær mer</a>
                </div>
              </div>
            </div>
          </Collapse>
        </Row>

         <Row>
          {/*Filter desktop*/}
          <Col xsHidden sm={4} md={3} lg={2}>
            <br/>
            <LessonFilterContainer/>
          </Col>

          {/*Filter mobile*/}
          <Col smHidden mdHidden lgHidden xs={12}>
            <br/>
            <Button bsStyle='success' onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>
              <Glyphicon glyph={this.state.showMobileFilter ? 'chevron-down' : 'chevron-right'}/>
              Vis/skjul filter
            </Button>
            <br/>
            <br/>
            <Collapse in={this.state.showMobileFilter}>
              <div>
                <LessonFilterContainer/>
              </div>
            </Collapse>
          </Col>

          <Col xs={12} sm={8} md={9} lg={10}>
            <Row>
              <Col xs={12}>
                <h2>Kurs</h2>
                <CourseList courses={this.props.courses}/>
              </Col>
            </Row>
            {Object.keys(this.props.externalCourses).length > 0 ?
              <Row>
                <Col xs={12}>
                  <h2>Kurs på andre nettsider</h2>
                  <CourseList courses={this.props.externalCourses}/>
                </Col>
              </Row>
            :null}
          </Col>
        </Row>
      </Grid>
    );
  }
});

FrontPage.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    isStudentMode: state.isStudentMode,
    externalCourses: getFilteredExternalCourses(state)
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  {
    changeMode
  }
)(withStyles(styles)(FrontPage));
