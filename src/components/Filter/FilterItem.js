import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PopoverComponent from '../PopoverComponent';

const styles = {

};

const FilterItem = ({tagName, checked, onCheck, popoverContent}) => {
  const popover = popoverContent ? <PopoverComponent {...{popoverContent}}/> : null;
  return (
    <Grid container wrap='nowrap' alignItems='center' justify='space-between'>
      <FormControlLabel label={tagName} control={
        <Checkbox color='default' checked={checked} onChange={onCheck}/>
      }/>
      {popover}
    </Grid>
  );
};

FilterItem.propTypes = {
  // ownProps
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  popoverContent: PropTypes.string.isRequired,
};

export default (withStyles(styles)(FilterItem));
