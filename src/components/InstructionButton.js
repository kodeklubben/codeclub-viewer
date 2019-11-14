import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Button} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import CreateIcon from '@material-ui/icons/Create';
import {getTranslator} from '../selectors/translate';
import {getLessonPath} from '../resources/lessonFrontmatter';
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

const InstructionButton = ({course, lesson, language, isReadme}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  const path = getLessonPath(course, lesson, language, isReadme);
  const buttonText = t(isReadme ? 'lessons.toteacherinstruction' : 'lessons.tolesson');

  return (
    <Button
      className={classes.buttonMargin}
      component={RouterLink}
      to={path}
      color='primary'
      variant='outlined'
      startIcon={isReadme ? <SchoolIcon color='primary'/> : <CreateIcon color='primary'/>}
    >
      {buttonText}
    </Button>
  );
};

InstructionButton.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default InstructionButton;
