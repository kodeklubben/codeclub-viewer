import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {getTranslator} from '../../selectors/translate';
import {getShowRadiobuttons, getShowFiltergroups} from '../../selectors/playlist';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import PopoverComponent from '../PopoverComponent';
import CollapsiblePanel from '../CollapsiblePanel';
import ClearFilterButton from './ClearFilterButton';

const styles = {
  test: {
    width: '100%',
  },
};

const LessonFilter = ({classes, filterGroupKeys, isStudentMode, t, showRadiobuttons, showFiltergroups}) => {
  const filterGroups = filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{t, groupKey}}/>);
  const header =
    <Grid container alignItems='center' justify='space-between'>
      <Typography variant='title'>{t('filter.header')}</Typography>
      <PopoverComponent inFilter={false} popoverContent={t('filter.tooltip')}/>
    </Grid>;
  const radioButtons = showRadiobuttons ? <RadioButtons/> : null;
  const groups = showFiltergroups ? filterGroups : null;
  return (
    <div>
      <CollapsiblePanel defaultExpanded={true} {...{header}}>
        <div className={classes.test}>
          {radioButtons}
          {groups}
        </div>
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
