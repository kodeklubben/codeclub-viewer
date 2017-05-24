import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import styles from './FrontPage.scss';
import Filter from '../components/FrontPage/Filter';
import {CoursesContainer} from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import {setModeTeacher} from '../action_creators';
import {getTranslator} from '../selectors/translate';

export const  FrontPage = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    return (
      <Grid fluid={true}>

        {/* Buttons */}
        {this.props.isStudentMode
          ? <Row>
              <div className={styles.center}>
                <LinkContainer to='/scratch/astrokatt/astrokatt'>
                  <Button bsStyle='student-frontpage'>
                    Kom i gang!
                  </Button>
                </LinkContainer>
                <Button bsStyle='teacher-frontpage' onClick={() => this.props.setModeTeacher()}>
                  Lærer/Veileder
                </Button>
              </div>
            </Row>
          : null}

        {/* Teacher infobox */}
        <Row>
          <TeacherInfobox isStudentMode={this.props.isStudentMode}/>
        </Row>

        <hr/>

        {/* Filter and courses */}
        <Row>
          <Col sm={4} md={3} lg={2}>
            <Filter isStudentMode={this.props.isStudentMode}/>
          </Col>
          <CoursesContainer/>
        </Row>
      </Grid>
    );
  }

});

FrontPage.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  isStudentMode: PropTypes.bool,
  setModeTeacher: PropTypes.func,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state)
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  {
    setModeTeacher
  }
)(withStyles(styles)(FrontPage));
