import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck, resetFilter} from '../../action_creators';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import FilterGroup from './FilterGroup';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LessonFilter.scss';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export const LessonFilter = React.createClass({
  render(){
    const filter = this.props.filter || {};
    const filterGroups = Object.keys(filter).map((groupName, idx) => {
      const tagItems = filter[groupName];
      return (
        <FilterGroup key={idx} groupName={groupName} tagItems={tagItems} onFilterCheck={this.props.onFilterCheck}/>
      );
    });
    const tooltip = 
      <Tooltip id="filterhelp">
        <p>I filteret kan man sortere ut de oppgavene man vil løse
            etter hvilke tema man vil jobbe med.</p>
        <p>Bak hvert valg står det antall oppgaver som kan løses,
            etter hvilke valg du gjør i filteret.</p>
      </Tooltip>;
    const title = 
        <h3>Filter
          <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={tooltip}>
            <Button className={styles.filterInfoButton}><Glyphicon glyph="info-sign"/></Button>
          </OverlayTrigger>
        </h3>;
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

)(withStyles(styles)(LessonFilter));
