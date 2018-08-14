import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  levelIcon: {
    marginRight: 5,
    width: '0.75em',
    height: '0.75em',
  },
};

const LevelIcon = ({classes, level}) => {
  return level ?
    <img className={classes.levelIcon} src={require('../assets/graphics/level-' + level + '.svg')}
      alt={'Level ' + level}
    />
    : null;
};

LevelIcon.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default withStyles(styles)(LevelIcon);
