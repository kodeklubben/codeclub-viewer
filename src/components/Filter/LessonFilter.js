import React, {PropTypes} from 'react';
import FilterGroup from './FilterGroup';
import Button from 'react-bootstrap/lib/Button';

const LessonFilter = React.createClass({
  render(){
    const filter = this.props.filter;
    const filterGroups = Object.keys(filter).map((groupName, idx) => {
      const tagItems = filter[groupName];
      return (
        <FilterGroup key={idx} groupName={groupName} tagItems={tagItems} onFilterCheck={this.props.onFilterCheck}/>
      );
    });
    return (
      <div className='panel panel-student'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Filter</h3>
        </div>
        <div className='panel-body'>
          {filterGroups}
          <br/>
          <Button block onClick={() => this.props.resetFilter()}>Fjern filter</Button>
        </div>
      </div>
    );
  }
});

LessonFilter.propTypes = {
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func,
  resetFilter: PropTypes.func
};

export default LessonFilter;
