import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Button} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {getTranslator} from '../../selectors/translate';


const ContinueButton = ({course}) => {
  const t = useSelector(state => getTranslator(state));
  const lastLesson = useSelector(state => state.lastLesson);

  const hasLastLesson = lastLesson !== '';

  return hasLastLesson && !course ?
    <Button
      size='small'
      component={RouterLink}
      to={lastLesson}
      color='primary'
      variant='outlined'
      aria-label={t('frontpage.continueButton')}
      startIcon={<ArrowForwardIcon color='primary'/>}
    >
      {t('frontpage.continueButton')}
    </Button>
    : null;
};

ContinueButton.propTypes = {
  course: PropTypes.string,
};

export default ContinueButton;
