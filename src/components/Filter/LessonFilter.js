import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck, resetFilter} from '../../action_creators';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import FilterGroup from './FilterGroup';
import ReactTooltip from 'react-tooltip';

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
      <div>  
        <Button data-place="right" 
          style={{ marginTop: 2, marginRight: 2 }} 
          className="pull-right" data-effect="solid" 
          data-multiline="true" 
          data-tip="I filteret kan man sortere ut de oppgavene man vil løse,<br>
                    etter hvilket operativsystem det skal kjøres på og/eller<br> hvilket tema man vil jobbe med.<br><br><br>
                    Bak hvert valg står det antall oppgaver som kan løses,<br>etter hvilke valg du gjør i filteret."
        >?
        </Button>
        <ReactTooltip />
        <Panel header={title} bsStyle={bsStyle}>
          {filterGroups}
          <br/>
          <Button block onClick={() => this.props.resetFilter()}>Fjern filter</Button>
        </Panel>
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
