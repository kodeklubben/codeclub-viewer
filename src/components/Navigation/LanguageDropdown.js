import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setLanguage} from '../../reducers/language';
import {resetOneFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import useStyles from 'isomorphic-style-loader/useStyles';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import {getAvailableLanguages} from '../../utils/filterUtils';
import styles from './LanguageDropdown.scss';
import Flag from '../Flag';

const availableLanguages = getAvailableLanguages();

const languages = {
  nb: 'Bokmål',
  en: 'English',
  nn: 'Nynorsk',
  is: 'Íslenska',
  ua: 'український',
};

const LanguageItem = ({language, onlyFlag}) => (
  // Note that the block with "float" (the flag) must be first in the containing div
  <div className={styles.languageItemContainer}>
    <Flag {...{language}}/>
    <span className={styles.language + (onlyFlag ? ' ' + styles.onlyFlag : '')}>
      {languages[language] || language}
    </span>
  </div>
);

const LanguageDropdown = () => {
  useStyles(styles);

  const isStudentMode = useSelector(state => state.isStudentMode);
  const language = useSelector(state => state.language);

  const dispatch = useDispatch();
  const handleSelect = eventKey => {
    dispatch(resetOneFilter('language', eventKey));
    dispatch(setLanguage(eventKey));
    dispatch(collapseAllFilterGroups(true));
  };

  const mode = isStudentMode ? 'student' : 'teacher';
  return (
    <div className={styles.gadgetContainer}>
      <DropdownButton id='language-dropdown'
        noCaret
        pullRight
        bsStyle={'language-' + mode}
        title={<LanguageItem onlyFlag={true} {...{language}}/>}
        onSelect={handleSelect}
      >
        {
          availableLanguages.map(key =>
            <MenuItem {...{key}} eventKey={key} active={language === key}>
              <LanguageItem onlyFlag={false} language={key}/>
            </MenuItem>
          )
        }
      </DropdownButton>
    </div>
  );
};

export default LanguageDropdown;
