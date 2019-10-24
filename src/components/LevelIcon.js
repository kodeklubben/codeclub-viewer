import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  levelIcon: {
    marginRight: theme.spacing(0.5),
    width: '0.75em',
    height: '0.75em',
    alignSelf: 'center',
  }
}));

const LevelIcon = ({level}) => {
  const classes = useStyles();
  return level ?
    <img
      className={classes.levelIcon}
      src={require('../assets/graphics/level-' + level + '.svg')}
      alt={'Level ' + level}
    />
    : null;
};

LevelIcon.propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default LevelIcon;
