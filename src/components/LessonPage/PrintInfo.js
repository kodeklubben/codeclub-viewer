import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import {capitalize} from '../../utils/stringUtils';
import {getLessonTags} from '../../resources/lessons';

const styles = {
  container: {
    display: 'none',
    fontStyle: 'italic',
    fontSize: 12,
    '@media print': {
      display: 'block',
    },
  },
};

const PrintInfo = ({classes, course, t, translateFilter, tags}) =>
  <div className={classes.container}>
    <div>{t('lessons.course')} {capitalize(course)}</div>
    {tags ? Object.keys(tags).map(group =>
      <div key={group}>
        {translateFilter(group) + ': ' + tags[group].map(tag => translateFilter(group, tag)).join(', ')}
      </div>
    ) : null}
  </div>;

PrintInfo.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  translateFilter: PropTypes.func.isRequired,
  tags: PropTypes.object,
};

const mapStateToProps = (state, {course, lesson}) => ({
  t: getTranslator(state),
  translateFilter: getTranslateFilter(state),
  tags: getLessonTags(course, lesson),
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PrintInfo));
