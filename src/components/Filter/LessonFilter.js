import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck, resetFilter} from '../../action_creators';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import {getAvailableLessons} from '../../selectors/lesson';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LessonFilter.scss';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export const LessonFilter = React.createClass({
  render(){
    const {onFilterCheck, resetFilter, isStudentMode, availableLessons, courseName, t} = this.props;
    const filter = this.props.filter || {};

    const filterGroups = Object.keys(filter).map((groupName) => {
      const tagItems = filter[groupName];
      return (
        <FilterGroup
          key={groupName}
          groupName={groupName}
          availableLessonsForTag={this.props.availableLessons}
          tagItems={tagItems}
          onFilterCheck={this.props.onFilterCheck}
        />
      );
    });
    const tooltip =
      <Tooltip id="filterhelp">
        <p>{t('filter.tooltip.textline1')}</p>
        <p>{t('filter.tooltip.textline2')}</p>
      </Tooltip>;
    const title =
        <h3>{t('filter.header')}
          <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={tooltip}>
            <Button className={styles.filterInfoButton}><Glyphicon glyph="info-sign"/></Button>
          </OverlayTrigger>
        </h3>;
    const bsStyle = (this.props.isStudentMode ? 'student' : 'teacher');
    return (
        <Panel header={title} bsStyle={bsStyle} className={
          this.props.isStudentMode ? styles.bgColorStudent : styles.bgColorTeacher}>
          {filterGroups}
          <br/>
          <Button block bsStyle="white-grey-lighter" onClick={() => this.props.resetFilter()}>{t('filter.removefilter')}</Button>
        </Panel>
    );
  }
});

LessonFilter.propTypes = {
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func,
  resetFilter: PropTypes.func,
  isStudentMode: PropTypes.bool,
  availableLessons: PropTypes.object,
  courseName: PropTypes.string,
  t: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    filter: state.filter,
    isStudentMode: state.isStudentMode,
    availableLessons: getAvailableLessons(state, ownProps.courseName),
    t: getTranslator(state)
  };
}

export const LessonFilterContainer = connect(
  mapStateToProps,
  {
    onFilterCheck,
    resetFilter
  }

)(withStyles(styles)(LessonFilter));
