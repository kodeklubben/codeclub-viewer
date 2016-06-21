import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';
import {capitalize} from '../../util';


const FilterItem = React.createClass({
  getInitialState() {
    return {
      checked: false
    };
  },
  onCheck() {
    const checked = this.state.checked;
    this.setState({checked: !checked});
    this.props.onCheck(this.props.tagItem, !checked);
  },
  render(){
    const tagItem = capitalize(this.props.tagItem);
    return (
      <Checkbox
        label={tagItem}
        checked={this.state.checked}
        onCheck={this.onCheck}
      />
    );
  }
});

FilterItem.propTypes = {
  tagItem: PropTypes.string,
  onCheck: PropTypes.func
};

export default FilterItem;
