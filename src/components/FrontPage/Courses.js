import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import {getFilteredCourses, getFilteredExternalCourses} from '../../selectors/course';
//import t from '../../selectors/translate';
import CourseList from '../CourseList/CourseList';

import {funky} from '../../util';
import {translate} from '../../util';
export const Courses = React.createClass({

  render() {
    const language = this.props.language;
    const coursesHeadline = funky(language, "courses");
    console.log("*****************************************");

    const temp = translate('frontpage.nocomputer');
    console.log(temp);



    return (
      <Col xs={12} sm={8} md={9} lg={8} lgOffset={1}>
        <Row>
          <Col xs={12}>
            <h2>{coursesHeadline}</h2>
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
    );
  }

});

Courses.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  language: PropTypes.string
};

function mapStateToProps(state) {
  return {
    language: state.language,
    courses: getFilteredCourses(state),
    externalCourses: getFilteredExternalCourses(state)
  };
}

export const CoursesContainer = connect(
  mapStateToProps
)(Courses);
