import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import {capitalize} from '../../utils/stringUtils';
import {getLessonTags} from '../../resources/lessons';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'none',
    fontStyle: 'italic',
    fontSize: '0.75em',
  
    '@media print': {
      display: 'block',
    },
  },
}));

const PrintInfo = ({course, lesson}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const translateFilter = useSelector(state => getTranslateFilter(state));

  const tags = getLessonTags(course, lesson);

  return (
    <div className={classes.container}>
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
