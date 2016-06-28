import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import CourseList from '../components/CourseList';
import LessonFilter from '../components/filter/LessonFilter';
import styles from './FrontPage.scss';
import * as actionCreators from '../action_creators';
import {getFilteredCourses} from '../selectors/course';
import ButtonGroup from '../components/ButtonGroup';

export const FrontPage = React.createClass({
  render() {
    return (
      <div>
        <ButtonGroup />
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
  courses: PropTypes.array,
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
)(FrontPage);
