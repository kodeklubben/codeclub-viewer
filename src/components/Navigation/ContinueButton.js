import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Button, Link} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../../selectors/translate';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
}));

const ContinueButton = ({course}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const lastLesson = useSelector(state => state.lastLesson);

  const hasLastLesson = lastLesson !== '';

  return hasLastLesson && !course ?
    <Link color='inherit' underline='none' component={RouterLink} to={lastLesson}>
      <Button variant='outlined' size='small' aria-label={t('frontpage.continueButton')}>
        <ArrowForwardIcon className={classes.icon}/>
        {t('frontpage.continueButton')}
      </Button>
    </Link>
    : null;
};

ContinueButton.propTypes = {
  course: PropTypes.string,
};

export default ContinueButton;
