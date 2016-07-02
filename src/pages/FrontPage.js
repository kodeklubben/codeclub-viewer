import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseList from '../components/CourseList/CourseList';
import LessonFilter from '../components/Filter/LessonFilter';
import styles from './FrontPage.scss';
import * as actionCreators from '../action_creators';
import {getFilteredCourses} from '../selectors/course';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Collapse} from 'react-bootstrap';
import ButtonItem from '../components/ButtonItem';

export const FrontPage = React.createClass({

  getInitialState() {
    return {
      show: false
    };
  },

  render() {
    const hrefAssistant = 'http://kidsakoder.no/kodeklubben/';
    const hrefTeacher = 'http://kidsakoder.no/skole/';

    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className={styles.title}>
              <span className={styles.t1}>kode</span><span className={styles.t2}>klubben_</span>
            </div>
          </div>
          <div className='row'>
            <div className={styles.center}>
              <ButtonItem color='green' onClick={() => this.displayExercise}>
                Kom i gang!
              </ButtonItem>
              <ButtonItem color='blue' onClick={() => this.setState({show: !this.state.show})}>
                Lærer/Veileder
              </ButtonItem>
            </div>
          </div>
          <div className='row'>
            <Collapse in={this.state.show}>
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
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <LessonFilter {...this.props}/>
          </div>
          <div className={styles.rightColumn}>
            <CourseList courses={this.props.courses}/>
          </div>
        </div>
      </div>
    );
  }
});

FrontPage.propTypes = {
  courses: PropTypes.object,
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    filter: state.filter
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(FrontPage));
