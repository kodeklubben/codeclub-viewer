import React from 'react';
import PropTypes from 'prop-types';
import {getAvailableLanguages} from '../utils/filterUtils';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  flag: {
    width: '30px',
    height: '20px',
  },
}));

const Flag = ({language}) => {
  const classes = useStyles();
  return (
    <img
      className={classes.flag}
      src={require(`../assets/graphics/flag_${language}.svg`)}
      alt=''
    />
  );
};

Flag.propTypes = {
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

export default Flag;
