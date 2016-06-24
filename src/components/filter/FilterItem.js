import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';
import {capitalize} from '../../util';


const FilterItem = React.createClass({
  render(){
    const tagItem = capitalize(this.props.tagItem);
    return (
      <Checkbox
        label={tagItem}
        checked={this.props.checked}
        onCheck={this.props.onCheck}
      />
    );
  }
});

FilterItem.propTypes = {
  tagItem: PropTypes.string,
  checked: PropTypes.bool,
  onCheck: PropTypes.func
};

export default FilterItem;
