import React, {PropTypes} from 'react';
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
      <div>
        <input type="checkbox"
               checked={this.state.checked}
               onClick={this.onCheck}
        />{tagItem}
      </div>
    );
  }
});

FilterItem.propTypes = {
  tagItem: PropTypes.string,
  onCheck: PropTypes.func
};

export default FilterItem;
