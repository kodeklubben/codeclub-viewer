import React, {PropTypes} from 'react';
import FilterItem from './FilterItem';
import {capitalize} from '../../util';

const FilterGroup = React.createClass({
  onCheck(tagItem, checked) {
    const tag = {};
    tag[this.props.groupName] = [tagItem];
    this.props.onCheck(tag, checked);
  },
  render(){
    const groupName = capitalize(this.props.groupName);
    const tags = this.props.tagItems;
    const filterItems = tags.map((tagItem, idx) => {
      return (
        <FilterItem key={idx} tagItem={tagItem} onCheck={this.onCheck}/>
      );
    });
    return (
      <div>
        <p>{groupName}</p>
        {filterItems}
      </div>
    );
  }
});

FilterGroup.propTypes = {
  groupName: PropTypes.string,
  tagItems: PropTypes.arrayOf(PropTypes.string),
  onCheck: PropTypes.func
};

export default FilterGroup;
