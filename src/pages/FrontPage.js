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
import WelcomeBox from '../components/FrontPage/WelcomeBox';
import {setModeTeacher} from '../action_creators';

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
              <WelcomeBox isStudentMode={false}/>
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
  setModeTeacher: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  {
    setModeTeacher
  }
)(withStyles(styles)(FrontPage));
