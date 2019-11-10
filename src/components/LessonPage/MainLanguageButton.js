import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Button, Link} from '@material-ui/core';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';
import {getLessonPath, getLessonExternal} from '../../resources/lessonFrontmatter';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  const button = (
    <Button
      className={classes.buttonMargin}
      disabled={!enabled}
      variant='outlined'
      startIcon={<Flag {...{language}}/>}
    >
      {buttonText}
    </Button>
  );
  return enabled ?
    <Link underline='none' component={RouterLink} to={path}>
      {button}
    </Link>
    : button;
};

MainLanguageButton.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default MainLanguageButton;
