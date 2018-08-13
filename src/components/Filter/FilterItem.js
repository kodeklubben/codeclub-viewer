import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PopoverComponent from '../PopoverComponent';

const styles = {
  test: {
    fontSize: 12,
  },
  label: {
    marginRight: 0,
  },
  text: {
    fontSize: 16
  },
  sizeIcon: {
    fontSize: 16,
  },
};

const FilterItem = ({classes, tagName, checked, onCheck, popoverContent}) => (
  <Grid container wrap='nowrap' alignItems='center' justify='space-between'>
    <FormControlLabel label={tagName} classes={{root: classes.label, label: classes.text}} control={
      <Checkbox
        disableRipple
        color='default'
        checked={checked}
        onChange={onCheck}
        icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
        checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
      />
    }/>
    {popoverContent ? <PopoverComponent inFilter={true} {...{popoverContent}}/> : null}
  </Grid>
);

FilterItem.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  popoverContent: PropTypes.string.isRequired,
};

export default (withStyles(styles)(FilterItem));
