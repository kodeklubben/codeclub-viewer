import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseList from '../components/CourseList/CourseList';
import LessonFilter from '../components/Filter/LessonFilter';
import * as actionCreators from '../action_creators';
import {getFilteredCourses} from '../selectors/course';

export const FrontPage = React.createClass({
  render() {
    return (
      <div className='container-fluid'>
        <div className="row">
          <div className='col-xs-12 col-sm-4 col-md-3 col-lg-2'>
            <LessonFilter {...this.props}/>
          </div>
          <div className='col-xs-12 col-sm-8 col-md-9 col-lg-10'>
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
)(FrontPage);
