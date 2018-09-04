import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PopoverComponent from '../PopoverComponent';
import {filterChecked} from '../../reducers/filter';

const styles = theme => ({
  container: {
    paddingLeft: theme.spacing.unit * 2,
  },
  labelRoot: {
    marginRight: 0,
  },
  label: {
    fontSize: 18,
  },
  checkbox: {
    width: 32,
    height: 32,
  },
  size: {
    fontSize: 16,
  },
});

class FilterItem extends React.PureComponent {
  handleChange = () => this.props.filterChecked(this.props.groupKey, this.props.itemKey);

  render() {
    const {classes, tagName, checked, popoverContent} = this.props;
    return (
      <Grid container wrap='nowrap' alignItems='center' justify='space-between' className={classes.container}>
        <FormControlLabel label={tagName} classes={{root: classes.labelRoot, label: classes.label}} control={
          <Checkbox
            color='default'
            {...{checked}}
            onChange={this.handleChange}
            classes={{root: classes.checkbox}}
            icon={<CheckBoxOutlineBlankIcon className={classes.size}/>}
            checkedIcon={<CheckBoxIcon className={classes.size}/>}
          />
        }/>
        {popoverContent ? <PopoverComponent inFilter={true} {...{popoverContent}}/> : null}
      </Grid>
    );
  }
}

FilterItem.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  itemKey: PropTypes.string.isRequired,
  groupKey: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  popoverContent: PropTypes.string.isRequired,

  // mapDispatchToProps:
  filterChecked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  filterChecked,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FilterItem));
