import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PrintInfo.scss';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import {capitalize} from '../../utils/stringUtils';
import {getLessonTags} from '../../resources/lessons';

const PrintInfo = ({course, t, translateFilter, tags}) => {
  useStyles(styles);
  return (
    <div className={styles.container}>
      <div>{t('lessons.course')} {capitalize(course)}</div>
      {tags ? Object.keys(tags).map(group =>
        <div key={group}>
          {translateFilter(group) + ': ' + tags[group].map(tag => translateFilter(group, tag)).join(', ')}
        </div>
      ) : null}
    </div>);
};

PrintInfo.propTypes = {
  // ownProps
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

export default connect(mapStateToProps)(PrintInfo);
