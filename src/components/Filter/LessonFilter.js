import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LessonFilter.scss';
import {resetFilter, showFilterGroups} from '../../action_creators';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import {getAvailableLessons} from '../../selectors/lesson';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import CollapsiblePanel from '../CollapsiblePanel';
import FilterLabels from './FilterLabels';
import Col from 'react-bootstrap/lib/Col';

const LessonFilter = ({t, availableLessons, isStudentMode, language, resetFilter, filterGroupKeys,
  showFilterGroups, filterGroupsCollapse, filter}) => {
  const filterGroups = filterGroupKeys.map((groupKey) => {
    return (
      <FilterGroup
        key={groupKey}
        groupKey={groupKey}
        availableLessonsForTag={availableLessons}
        t={t}
      />
    );
  });
  const tooltip =
    <Tooltip id="filterhelp">
      <p>{t('filter.tooltip.textline1')}</p>
      <p>{t('filter.tooltip.textline2')}</p>
    </Tooltip>;
  const header =
      <span>
        {t('filter.header')}
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={tooltip}
                        onClick={(e) => e.stopPropagation()}>
          <span className={styles.filterInfo}><Glyphicon glyph="info-sign"/></span>
        </OverlayTrigger>
      </span>;

  const isShowingFilterGroup = (filterGroup) => {
    for (let key of Object.keys(filterGroup)) {
      if (filterGroup[key]) {
        showFilterGroups(key, false);
      }
    }
  };
  const hasCheckedItems = (filter, language) => {
    let counter = 0;
    for (let i of Object.keys(filter)) {
      for (let j of Object.keys(filter[i])) {
        filter[i][j] === true ? counter++ : null;
      }
    }
    if (filter.language[language] && counter === 1) {
      return true;
    }
    return false;
  };
  const clearFilter =  hasCheckedItems(filter, language) ? null :
    <ListGroupItem>
      <Button block bsStyle="white-grey-lighter"
              onClick={() => {resetFilter('language', language);
                isShowingFilterGroup(filterGroupsCollapse);}}>
        {t('filter.removefilter')}
      </Button>
    </ListGroupItem>;
  const bsStyle = (isStudentMode ? 'student' : 'teacher');
  return (
    <div>
      {/*Filter desktop*/}
      <Col xsHidden>
        <Panel header={header} bsStyle={bsStyle}>
          <ListGroup fill>
            {filterGroups}
            {clearFilter}
          </ListGroup>
        </Panel>
      </Col>
      {/*Filter mobile*/}
      <Col smHidden mdHidden lgHidden>
        <CollapsiblePanel initiallyExpanded={false} header={header} bsStyle={bsStyle}>
          <ListGroup fill>
            {filterGroups}
            {clearFilter}
          </ListGroup>
        </CollapsiblePanel>
        <FilterLabels t={t}/>
      </Col>
    </div>
  );
};

LessonFilter.propTypes = {
  filterGroupKeys: PropTypes.arrayOf(PropTypes.string),
  onFilterCheck: PropTypes.func,
  resetFilter: PropTypes.func,
  isStudentMode: PropTypes.bool,
  availableLessons: PropTypes.object,
  courseName: PropTypes.string,
  t: PropTypes.func.isRequired,
  language: PropTypes.string,
  showFilterGroups: PropTypes.func,
  filterGroupsCollapse: PropTypes.object,
  filter: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    language: state.language,
    filterGroupKeys: Object.keys(state.filter),
    isStudentMode: state.isStudentMode,
    availableLessons: getAvailableLessons(state, ownProps.courseName),
    t: getTranslator(state),
    filterGroupsCollapse: state.filterGroupsCollapse,
    filter: state.filter
  };
}

const mapDispatchToProps = {
  resetFilter,
  showFilterGroups
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LessonFilter));
