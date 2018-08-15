import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PopoverComponent from '../PopoverComponent';

const styles = theme => ({
  container: {
    paddingLeft: theme.spacing.unit * 2,
  },
  label: {
    marginRight: 0,
  },
  checkbox: {
    width: 32,
    height: 32,
  },
  size: {
    fontSize: 16,
  },
});

const FilterItem = ({classes, tagName, checked, onCheck, popoverContent}) => (
  <Grid container wrap='nowrap' alignItems='center' justify='space-between' className={classes.container}>
    <FormControlLabel label={tagName} classes={{root: classes.label, label: classes.size}} control={
      <Checkbox
        color='default'
        checked={checked}
        onChange={onCheck}
        classes={{root: classes.checkbox}}
        icon={<CheckBoxOutlineBlankIcon className={classes.size}/>}
        checkedIcon={<CheckBoxIcon className={classes.size}/>}
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
