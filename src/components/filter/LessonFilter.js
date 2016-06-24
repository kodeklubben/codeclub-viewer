import React, {PropTypes} from 'react';
import FilterGroup from './FilterGroup';
import Divider from 'material-ui/Divider';
import {Card, CardText, CardTitle} from 'material-ui/Card';

const LessonFilter = React.createClass({
  render(){
    const filter = this.props.filter;
    const tagNodes = Object.keys(filter).map((groupName, idx) => {
      const tagItems = filter[groupName];
      return (
        <div key={idx}>
          <FilterGroup groupName={groupName} tagItems={tagItems} onFilterCheck={this.props.onFilterCheck}/>
          <br/>
          <Divider/>
        </div>
      );
    });
    return (
      <Card>
        <CardTitle title="Filter" />
        <CardText>
          {tagNodes}
        </CardText>
      </Card>
    );
  }
});

LessonFilter.propTypes = {
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func
};

export default LessonFilter;
