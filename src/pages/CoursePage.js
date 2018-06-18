import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import cx from 'classnames';
import styles from './CoursePage.scss';
import {getLessonLevels} from '../resources/lessonData';
import {getTranslator} from '../selectors/translate';
import {getShowFiltergroups} from '../selectors/playlist';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/CoursePage/LessonList';
import LevelNavigation from '../components/CoursePage/LevelNavigation';
import PlaylistNavigation from '../components/CoursePage/PlaylistNavigation';
import CourseInfo from '../components/CoursePage/CourseInfo';
import {getCourseTitle} from '../resources/courseFrontmatter';

const CoursePage = ({params, courseTitle, lessonLevels, t, showPlaylists}) => {
  const {course} = params;
  const lessonLists = lessonLevels.map(level => <LessonList key={level} {...{course, level}} />);
  const filter = <Col xs={12} sm={3} className={cx({[styles.topMargin]: lessonLists.length})}>
    <LessonFilter course={course}/>
  </Col>;
  const jumpTo = lessonLevels.length > 0 ? <div><LevelNavigation {...{lessonLevels}}/></div> : null;
  let thispage = null;
  const jumpToAffixed = jumpTo ?
    <Col xsHidden sm={3} className={cx(styles.jumpTo, {[styles.topMargin]: lessonLists.length})}>
      <AutoAffix viewportOffsetTop={15} container={() => thispage}>
        {jumpTo}
      </AutoAffix>
    </Col> : null;
  return (
    <DocumentTitle title={courseTitle + ' | ' + t('title.codeclub')}>
      <Grid fluid={true} ref={grid => thispage = grid}>
        <Row>
          <Col xs={12}><h1>{courseTitle}</h1></Col>
          <Col xs={12}><CourseInfo courseName={course}/></Col>
        </Row>
        {showPlaylists ?
          <Row>
            {filter}
            <Col xs={12} sm={9}><PlaylistNavigation {...{course}}/></Col>
          </Row>
          :
          <Row>
            {filter}
            <Col xs={12} smHidden mdHidden lgHidden>{jumpTo}</Col>
            <Col xs={12} sm={6}>
              {lessonLists.length ?
                lessonLists :
                <div className={styles.noMatchingLessons}>{t('coursepage.nomatchinglessons')}</div>
              }
            </Col>
            {jumpToAffixed}
          </Row>
        }
      </Grid>
    </DocumentTitle>
  );
};

CoursePage.propTypes = {
  // ownProps
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  }).isRequired,

  // mapStateToProps
  courseTitle: PropTypes.string.isRequired,
  lessonsLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func.isRequired,
  showPlaylists: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {params}) => ({
  courseTitle: getCourseTitle(params.course, state.language),
  lessonLevels: getLessonLevels(state, params.course),
  t: getTranslator(state),
  showPlaylists: !getShowFiltergroups(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(CoursePage));
