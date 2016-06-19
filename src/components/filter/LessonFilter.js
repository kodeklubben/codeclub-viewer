import React from 'react';
import FilterGroup from './FilterGroup';
import Divider from 'material-ui/Divider';
import {Card, CardText, CardTitle} from 'material-ui/Card';

const LessonFilter = React.createClass({
  render(){
    const tagGroups = this.props.tagGroups;
    const tagGroupNodes = tagGroups.map((tagGroup, idx) => {
      return (
        <div key={idx}>
          <FilterGroup tagGroup={tagGroup} onCheck={this.props.onCheck}/>
          <br/>
          <Divider/>
        </div>
      );
    });
    return (
      <Card>
        <CardTitle title="Filter" />
        <CardText>
          {tagGroupNodes}
        </CardText>
      </Card>
    );
  }
});

export default LessonFilter;
