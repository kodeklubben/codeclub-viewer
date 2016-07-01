import React, {PropTypes} from 'react';
import FilterItem from './FilterItem';
import {capitalize} from '../../util';

const FilterGroup = React.createClass({
  render(){
    const groupName = capitalize(this.props.groupName);
    const filterTags = this.props.tagItems;
    const filterItems = Object.keys(filterTags).map((tagItem, idx) => {
      return (
        <FilterItem key={idx} tagItem={tagItem} checked={filterTags[tagItem]} onCheck={ () => this.props.onFilterCheck(groupName, tagItem)}/>
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
  tagItems: PropTypes.object,
  onCheck: PropTypes.func
};

export default FilterGroup;
