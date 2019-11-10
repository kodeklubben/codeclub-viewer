/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {getTranslator} from '../../selectors/translate';
import {Button} from '@material-ui/core';
import {getLessonPath} from '../../resources/lessonFrontmatter';
import GetAppIcon from '@material-ui/icons/GetApp';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const PdfButton = ({course, lesson, language, isReadme}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  const path = getLessonPath(course, lesson, language, isReadme);

  return (
    <Button
      className={classes.buttonMargin}
      component={RouterLink}
      variant='outlined'
      href={`${process.env.PUBLICPATH}${path.slice(1)}.pdf`}
      download={true}
      startIcon={<GetAppIcon/>}
    >
      {t('lessons.pdf')}
    </Button>
  );
};

PdfButton.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default PdfButton;
