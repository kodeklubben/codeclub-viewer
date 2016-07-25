import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck, resetFilter} from '../../action_creators';
import FilterGroup from './FilterGroup';
import Button from 'react-bootstrap/lib/Button';

export const LessonFilter = React.createClass({
  render(){
    const filter = this.props.filter || {};
    const filterGroups = Object.keys(filter).map((groupName, idx) => {
      const tagItems = filter[groupName];
      return (
        <FilterGroup key={idx} groupName={groupName} tagItems={tagItems} onFilterCheck={this.props.onFilterCheck}/>
      );
    });

    return (
      <div className={this.props.isStudentMode ? 'panel panel-student' : 'panel panel-teacher'}>
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
  resetFilter: PropTypes.func,
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    filter: state.filter,
    isStudentMode: state.isStudentMode
  };
}

export const LessonFilterContainer = connect(
  mapStateToProps,
  {
    onFilterCheck,
    resetFilter
  }

)(LessonFilter);
