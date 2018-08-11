import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Flag from '../Flag';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseCountPerLanguage} from '../../selectors/lesson';
import {onlyCheckedMainLanguage} from '../../selectors/filter';

const styles = {
  grey: {
    color: grey[600],
  },
};

const LessonCount = ({classes, lessonsPerLanguage, showFlag, t}) => {
  const totalNumberOfLessons = Object.keys(lessonsPerLanguage).reduce((sum, n) => sum + lessonsPerLanguage[n], 0);
  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item className={classes.grey}>{t('frontpage.lessoncount', {count: totalNumberOfLessons})}</Grid>
      {showFlag ?
        <Grid item container justify='center' spacing={8}>
          {Object.keys(lessonsPerLanguage).map(language =>
            <Grid item key={language}>
              <Flag {...{language}}/>
            </Grid>
          )}
        </Grid> :
        null
      }
    </Grid>
  );
};

LessonCount.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,

  // mapStateToProps
  lessonsPerLanguage: PropTypes.objectOf(PropTypes.number),
  showFlag: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {course}) => ({
  lessonsPerLanguage: getFilteredLessonsInCourseCountPerLanguage(state, course),
  showFlag: !onlyCheckedMainLanguage(state),
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonCount));
