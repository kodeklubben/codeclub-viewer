import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';

const LevelIcon = ({level, fontSize}) => {
  if (level === 1 || level === '1') {
    return <RadioButtonUncheckedIcon {...{fontSize}}/>;
  }
  if (level === 2 || level === '2') {
    return <ChangeHistoryIcon {...{fontSize}}/>;
  }
  if (level === 3 || level === '3') {
    return <CheckBoxOutlineBlankIcon {...{fontSize}}/>;
  }
  if (level === 4 || level === '4') {
    return <FilterVintageIcon {...{fontSize}}/>;
  }
};

LevelIcon.propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.string,
};

export default LevelIcon;
