import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Hidden from '@material-ui/core/Hidden';
import styles from './LessonFilter.scss';
import Panel from 'react-bootstrap/lib/Panel';
import {getTranslator} from '../../selectors/translate';
import {getShowRadiobuttons, getShowFiltergroups} from '../../selectors/playlist';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import PopoverComponent from '../PopoverComponent';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import CollapsiblePanel from '../CollapsiblePanel';
import ClearFilterButton from './ClearFilterButton';

const LessonFilter = ({filterGroupKeys, isStudentMode, t, showRadiobuttons, showFiltergroups}) => {
  const filterGroups = filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{t, groupKey}}/>);
  const header =
    <span>
      {t('filter.header')}
      <PopoverComponent popoverContent={t('filter.tooltip')}>
        <span className={styles.filterInfo}><Glyphicon glyph="info-sign"/></span>
      </PopoverComponent>
    </span>;
  const bsStyle = (isStudentMode ? 'student' : 'teacher');
  const radioButtons = showRadiobuttons ? <RadioButtons/> : null;
  const groups = showFiltergroups ? filterGroups : null;
  return (
    <div>
      {/*Filter desktop*/}
      <Hidden only='xs'>
        <Panel {...{header, bsStyle}}>
          <ListGroup fill>
            {radioButtons}
            {groups}
          </ListGroup>
        </Panel>
      </Hidden>
      {/*Filter mobile*/}
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <CollapsiblePanel initiallyExpanded={true} {...{header, bsStyle}}>
          <ListGroup fill>
            {radioButtons}
            {groups}
          </ListGroup>
        </CollapsiblePanel>
      </Hidden>
      <ClearFilterButton/>
    </div>
  );
};

LessonFilter.propTypes = {
  // ownProps
  courseName: PropTypes.string,

  // mapStateToProps
  filterGroupKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  showRadiobuttons: PropTypes.bool.isRequired,
  showFiltergroups: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {courseName}) => ({
  filterGroupKeys: Object.keys(state.filter),
  isStudentMode: state.isStudentMode,
  t: getTranslator(state),
  showRadiobuttons: getShowRadiobuttons(state, courseName),
  showFiltergroups: getShowFiltergroups(state, courseName),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonFilter));
