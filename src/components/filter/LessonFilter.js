import React, {PropTypes} from 'react';
import FilterGroup from './FilterGroup';

const LessonFilter = React.createClass({
  render(){
    const filter = this.props.filter;
    const tagNodes = Object.keys(filter).map((groupName, idx) => {
      const tagItems = filter[groupName];
      return (
        <div key={idx}>
          <FilterGroup groupName={groupName} tagItems={tagItems} onFilterCheck={this.props.onFilterCheck}/>
          <hr/>
        </div>
      );
    });
    return (
      <div>
        <h3>Filter</h3>
        <div>
          {tagNodes}
        </div>
      </div>
    );
  }
});

LessonFilter.propTypes = {
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func
};

export default LessonFilter;
