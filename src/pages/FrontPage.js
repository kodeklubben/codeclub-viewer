import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseList from '../components/CourseList/CourseList';
import LessonFilter from '../components/Filter/LessonFilter';
import styles from './FrontPage.scss';
import * as actionCreators from '../action_creators';
import {getFilteredCourses} from '../selectors/course';
import ButtonGroup from '../components/ButtonGroup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

export const FrontPage = React.createClass({
  render() {
    return (
      <div>
        <div className={styles.title}>Kodeklubben</div>
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
