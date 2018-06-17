import React from 'react';
import PropTypes from 'prop-types';
import styles from './Flag.scss';
import {getAvailableLanguages} from '../util';

const Flag = ({language}) =>
  <img className={styles.flag} src={require(`../assets/graphics/flag_${language}.svg`)}/>;

Flag.propTypes = {
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

export default Flag;
