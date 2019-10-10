import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Flag.scss';
import {getAvailableLanguages} from '../utils/filterUtils';
import {getTranslator, getTranslateFilter} from '../selectors/translate';

const Flag = ({language}) => {
  useStyles(styles);

  const {translateFilter, t} = useSelector(state => ({
    translateFilter: getTranslateFilter(state),
    t: getTranslator(state),
  }));

  return (
    <img
      className={styles.flag}
      src={require(`../assets/graphics/flag_${language}.svg`)}
      alt={t('general.picture', {title: translateFilter('language', language)})}
    />);
};

Flag.propTypes = {
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

export default Flag;
