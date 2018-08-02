import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setLanguage} from '../../reducers/language';
import {resetOneFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import {getAvailableLanguages} from '../../util';
import styles from './LanguageDropdown.scss';
import {getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';

const availableLanguages = getAvailableLanguages();

const LanguageItem = ({language, translateFilter, onlyFlag}) => (
  // Note that the block with "float" (the flag) must be first in the containing div
  <div className={styles.languageItemContainer}>
    <Flag language={language}/>
    <span className={styles.language + (onlyFlag ? ' ' + styles.onlyFlag : '')}>
      {translateFilter('language', language)}
    </span>
  </div>
);

LanguageItem.propTypes = {
  // ownProps
  onlyFlag: PropTypes.bool.isRequired,

  // mapStateToProps
  language: PropTypes.oneOf(availableLanguages).isRequired,
  translateFilter: PropTypes.func.isRequired
};

const LanguageDropdown = ({isStudentMode, language, translateFilter,
  resetOneFilter, setLanguage, collapseAllFilterGroups}) => {
  const mode = isStudentMode ? 'student' : 'teacher';
  return (
    <div className={styles.gadgetContainer}>
      <DropdownButton id='language-dropdown'
        noCaret
        pullRight
        bsStyle={'language-' + mode}
        title={<LanguageItem onlyFlag={true} {...{language, translateFilter}}/>}
        onSelect={(eventKey) => {
          resetOneFilter('language', eventKey);
          setLanguage(eventKey);
          collapseAllFilterGroups(true);
        }}>

        {
          availableLanguages.map(key =>
            <MenuItem {...{key}} eventKey={key} active={language === key}>
              <LanguageItem onlyFlag={false} language={key} {...{translateFilter}}/>
            </MenuItem>
          )
        }
      </DropdownButton>
    </div>
  );
};

LanguageDropdown.propTypes = {
  // mapStateToProps:
  language: PropTypes.oneOf(availableLanguages).isRequired,
  translateFilter: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,

  // mapDispatchToProps:
  setLanguage: PropTypes.func.isRequired,
  resetOneFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  translateFilter: getTranslateFilter(state),
  isStudentMode: state.isStudentMode,
});

const mapDispatchToProps = {
  setLanguage,
  resetOneFilter,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LanguageDropdown));
