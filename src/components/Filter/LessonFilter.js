import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck, resetFilter} from '../../action_creators';
import FilterGroup from './FilterGroup';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

export const LessonFilter = React.createClass({
  render(){
    const filter = this.props.filter || {};
    const filterGroups = Object.keys(filter).map((groupName, idx) => {
      const tagItems = filter[groupName];
      return (
        <FilterGroup key={idx} groupName={groupName} tagItems={tagItems} onFilterCheck={this.props.onFilterCheck}/>
      );
    });

    const title = <h3>Filter</h3>;
    const bsStyle = (this.props.isStudentMode ? 'student' : 'teacher');
    return (
      <Panel header={title} bsStyle={bsStyle}>
        {filterGroups}
        <br/>
        <Button block onClick={() => this.props.resetFilter()}>Fjern filter</Button>
      </Panel>
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
