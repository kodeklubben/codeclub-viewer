import React from 'react';
import {useSelector, connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './RadioButtons.scss';
import {getTranslator} from '../../selectors/translate';
import {setShowPlaylists} from '../../reducers/showPlaylists';
import {resetAllFilters} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const RadioButton = ({checked, onChange, text}) => (
  <label className={styles.label}>
    <input type='radio' name='radioGroup' {...{checked, onChange}}/>
    <span className={styles.marginLeft}>{text}</span>
  </label>
);

const RadioButtons = ({setShowPlaylists, resetAllFilters, collapseAllFilterGroups}) => {
  useStyles(styles);

  const {showPlaylists, language, t} = useSelector(state => ({
    showPlaylists: state.showPlaylists,
    language: state.language,
    t: getTranslator(state),
  }));

  const handleChangeToPlaylists = () => {
    setShowPlaylists(true);
    resetAllFilters('language', language);
    collapseAllFilterGroups(true);
  };

  return (
    <form role='group' aria-label={t('filter.radio.group')}>
      <RadioButton
        checked={showPlaylists}
        onChange={handleChangeToPlaylists}
        text={t('filter.radio.playlists')}
      />
      <RadioButton
        checked={!showPlaylists}
        onChange={() => setShowPlaylists(false)}
        text={t('filter.radio.lessons')}
      />
    </form>
  );
};

const mapDispatchToProps = {
  setShowPlaylists,
  resetAllFilters,
  collapseAllFilterGroups
};

export default connect(null, mapDispatchToProps)(RadioButtons);
