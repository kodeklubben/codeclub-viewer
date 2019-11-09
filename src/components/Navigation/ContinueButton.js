import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Button, Link} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {getTranslator} from '../../selectors/translate';


const ContinueButton = ({course}) => {
  const t = useSelector(state => getTranslator(state));
  const lastLesson = useSelector(state => state.lastLesson);

  const hasLastLesson = lastLesson !== '';

  return hasLastLesson && !course ?
    <Link underline='none' component={RouterLink} to={lastLesson}>
      <Button
        variant='outlined'
        size='small'
        aria-label={t('frontpage.continueButton')}
        startIcon={<ArrowForwardIcon/>}
      >
        {t('frontpage.continueButton')}
      </Button>
    </Link>
    : null;
};

ContinueButton.propTypes = {
  course: PropTypes.string,
};

export default ContinueButton;
