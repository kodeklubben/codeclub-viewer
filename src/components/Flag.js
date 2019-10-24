import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {getAvailableLanguages} from '../utils/filterUtils';
import {getTranslator, getTranslateFilter} from '../selectors/translate';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  flag: {
    width: '30px',
    height: '20px',
  },
}));

const Flag = ({language}) => {
  const classes = useStyles();

  const translateFilter = useSelector(state => getTranslateFilter(state));
  const t = useSelector(state => getTranslator(state));

  return (
    <img
      className={classes.flag}
      src={require(`../assets/graphics/flag_${language}.svg`)}
      alt={t('general.picture', {title: translateFilter('language', language)})}
    />
  );
};

Flag.propTypes = {
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

export default Flag;
