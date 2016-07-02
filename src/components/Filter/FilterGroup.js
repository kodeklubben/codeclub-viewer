import React, {PropTypes} from 'react';
import FilterItem from './FilterItem';
import {capitalize} from '../../util';
import styles from './Filter.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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
        <h4>{groupName}</h4>
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

export default withStyles(styles)(FilterGroup);
