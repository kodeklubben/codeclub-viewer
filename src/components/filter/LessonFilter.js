import React, {PropTypes} from 'react';
import FilterGroup from './FilterGroup';

const LessonFilter = React.createClass({
  render(){
    const tags = this.props.tags;
    const tagNodes = Object.keys(tags).map((groupName, idx) => {
      const tagItems = tags[groupName];
      return (
        <div key={idx}>
          <FilterGroup groupName={groupName} tagItems={tagItems} onCheck={this.props.onCheck}/>
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
  tags: PropTypes.object,
  onCheck: PropTypes.func
};

export default LessonFilter;
