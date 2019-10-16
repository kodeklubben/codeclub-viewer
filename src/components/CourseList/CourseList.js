import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import CourseItem from './CourseItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const CourseList = ({courses}) => {
  const language = useSelector(state => state.language);
  return (
    <Row>
      <div>
        {courses.map(course => (
          <Col key={course} xs={6} sm={6} md={4} lg={3}>
            <CourseItem {...{course, language}}/>
          </Col>
        ))}
      </div>
    </Row>
  );
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default CourseList;
