import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Button} from '@material-ui/core';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';
import {getLessonPath, getLessonExternal} from '../../resources/lessonFrontmatter';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    '@media print': {
      display: 'none',
    },
  },
}));

const MainLanguageButton = ({course, lesson, isReadme}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const translateFilter = useSelector(state => getTranslateFilter(state));
  const language = useSelector(state => state.language);

  const lang = translateFilter('language', language);
  const path = getLessonPath(course, lesson, language, isReadme);
  const external = getLessonExternal(course, lesson, language, isReadme);
  const enabled = path && !external;
  const buttonText = t(enabled ? 'lessons.tomainlanguage' : 'lessons.nottranslated', {lang});

  return (
    <Button
      className={classes.buttonMargin}
      component={RouterLink}
      to={path}
      disabled={!enabled}
      color='primary'
      variant='outlined'
      startIcon={<Flag {...{language}}/>}
    >
      {buttonText}
    </Button>
  );
};

MainLanguageButton.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default MainLanguageButton;
