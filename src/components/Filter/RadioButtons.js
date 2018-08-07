import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {getTranslator} from '../../selectors/translate';
import {setShowPlaylists} from '../../reducers/showPlaylists';
import {resetAllFilters} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const RadioButtons = ({
  classes, showPlaylists, language, t, setShowPlaylists, resetAllFilters, collapseAllFilterGroups
}) => (
  <RadioGroup aria-label='Radio'>
    <FormControlLabel label={t('filter.radio.playlists')} control={
      <Radio
        checked={showPlaylists}
        onChange={() => {
          setShowPlaylists(true);
          resetAllFilters('language', language);
          collapseAllFilterGroups(true);
        }}
        name='radioGroup'
        color='default'
      />}
    />
    <FormControlLabel label={t('filter.radio.lessons')} control={
      <Radio
        checked={!showPlaylists}
        onChange={() => setShowPlaylists(false)}
        name='radioGroup'
        color='default'
      />}
    />
  </RadioGroup>
);

RadioButtons.propTypes = {
  // mapStateToProps
  showPlaylists: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setShowPlaylists: PropTypes.func.isRequired,
  resetAllFilters: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showPlaylists: state.showPlaylists,
  language: state.language,
  t: getTranslator(state),
});

const mapDispatchToProps = {
  setShowPlaylists,
  resetAllFilters,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RadioButtons);
