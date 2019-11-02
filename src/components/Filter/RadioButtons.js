import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
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

const RadioButtons = () => {
  useStyles(styles);

  const showPlaylists = useSelector(state => state.showPlaylists);
  const language = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));

  const dispatch = useDispatch();
  const handleChangeToPlaylists = () => {
    dispatch(setShowPlaylists(true));
    dispatch(resetAllFilters('language', language));
    dispatch(collapseAllFilterGroups(true));
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
        onChange={() => dispatch(setShowPlaylists(false))}
        text={t('filter.radio.lessons')}
      />
    </form>
  );
};

export default RadioButtons;
