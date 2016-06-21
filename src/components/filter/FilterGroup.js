import React, {PropTypes} from 'react';
import FilterItem from './FilterItem';
import capitalize from '../../util';

const FilterGroup = React.createClass({
  onCheck(tagName, checked) {
    const tag = {
      groupName: this.props.tagGroup.name,
      name: tagName
    };
    this.props.onCheck(tag, checked);
  },
  render(){
    const groupName = capitalize(this.props.tagGroup.name);
    const tags = this.props.tagGroup.tags;
    const filterItems = tags.map((tag, idx) => {
      return (
        <FilterItem key={idx} tag={tag} onCheck={this.onCheck}/>
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
  tagGroup: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  onCheck: PropTypes.func
};

export default FilterGroup;
