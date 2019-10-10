import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PrintInfo.scss';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import {capitalize} from '../../utils/stringUtils';
import {getLessonTags} from '../../resources/lessons';

const PrintInfo = ({course, lesson}) => {
  useStyles(styles);

  const t = useSelector(state => getTranslator(state));
  const translateFilter = useSelector(state => getTranslateFilter(state));
  const tags = getLessonTags(course, lesson);

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
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
};

export default PrintInfo;
