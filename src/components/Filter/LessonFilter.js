import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import {getTranslator} from '../../selectors/translate';
import {getShowRadiobuttons, getShowFiltergroups} from '../../selectors/playlist';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import PopoverComponent from '../PopoverComponent';
import CollapsiblePanel from '../CollapsiblePanel';
import ClearFilterButton from './ClearFilterButton';

const styles = {
  marginTop: {
    marginTop: '28px',
  },
};

const LessonFilter = ({classes, filterGroupKeys, isStudentMode, t, showRadiobuttons, showFiltergroups}) => {
  const filterGroups = filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{t, groupKey}}/>);
  const header =
    <Grid container alignItems='center' justify='space-between'>
      {t('filter.header')}
      <PopoverComponent popoverContent={t('filter.tooltip')}/>
    </Grid>;
  const radioButtons = showRadiobuttons ? <li><RadioButtons/></li> : null;
  const groups = showFiltergroups ? filterGroups : null;
  return (
    <div className={classes.marginTop}>
      <CollapsiblePanel defaultExpanded={true} {...{header}}>
        <List>
          {radioButtons}
          {groups}
        </List>
      </CollapsiblePanel>
      <ClearFilterButton/>
    </div>
  );
};

LessonFilter.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string,

  // mapStateToProps
  filterGroupKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  showRadiobuttons: PropTypes.bool.isRequired,
  showFiltergroups: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course}) => ({
  filterGroupKeys: Object.keys(state.filter),
  isStudentMode: state.isStudentMode,
  t: getTranslator(state),
  showRadiobuttons: getShowRadiobuttons(course),
  showFiltergroups: getShowFiltergroups(state, course),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonFilter));
