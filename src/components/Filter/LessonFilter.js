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
    
        /*Include a help-button for filter, e.g. a question mark next to the title, explaining how the filter works, and what the tags mean. This includes explaining that groups intersect, and but tags within a group are a union, and that if nothing is checkmarked within a group, all are shown (rather than none).

        It must also explain what that tags mean; e.g. does "android" mean that it shows lessons that requires an android device to run, or and android device to program on, and does it mean that it only works on android, or that it also works on android?

        If possible, we should avoid explaining what each tag means, and just have a general rule of how tags behave.*/

    const title = <h3>Filter</h3>;
    const bsStyle = (this.props.isStudentMode ? 'student' : 'teacher');
    return (
      <div>  
        <Button data-place="right" style={{ marginTop: 2, marginRight: 2 }} className="pull-right" data-effect="solid" data-multiline="true" data-tip="I filteret ser man hvor mange oppgaver man kan velge i parentesene bak valgene i Operativsystem og Tema.<br> Velger man f.eks. Android, under Operativsystem, får man opp de kursene som kun fungerer på Anroid<br>Velger man f.eks. App, under Tema, får man opp de kursene som ">?</Button>
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
