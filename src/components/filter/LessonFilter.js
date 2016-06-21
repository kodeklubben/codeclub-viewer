import React, {PropTypes} from 'react';
import FilterGroup from './FilterGroup';
import Divider from 'material-ui/Divider';
import {Card, CardText, CardTitle} from 'material-ui/Card';

const LessonFilter = React.createClass({
  render(){
    const tags = this.props.tags;
    const tagNodes = Object.keys(tags).map((groupName, idx) => {
      const tagItems = tags[groupName];
      return (
        <div key={idx}>
          <FilterGroup groupName={groupName} tagItems={tagItems} onCheck={this.props.onCheck}/>
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
  tagGroups: PropTypes.object,
  onCheck: PropTypes.func
};

export default LessonFilter;
