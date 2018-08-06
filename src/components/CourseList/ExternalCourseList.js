import React from 'react';
import PropTypes from 'prop-types';
import CourseItem from './CourseItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const ExternalCourseList = ({coursesWithLanguage}) => (
  <Row>
    <div>
      {coursesWithLanguage.map(({course, language}) => (
        <Col key={`${course}_${language}`} xs={6} sm={6} md={4} lg={3}>
          <CourseItem {...{course, language}}/>
        </Col>
      ))}
    </div>
  </Row>
);

ExternalCourseList.propTypes = {
  // ownProps
  coursesWithLanguage: PropTypes.arrayOf(PropTypes.shape({
    course: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  })).isRequired,
};

export default ExternalCourseList;
