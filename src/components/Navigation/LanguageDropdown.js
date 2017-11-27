import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setLanguage, resetFilter} from '../../action_creators';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import {getAvailableLanguages, translateTag} from '../../util';
import styles from './LanguageDropdown.scss';
import {getTranslator} from '../../selectors/translate';

const availableLanguages = getAvailableLanguages();

const LanguageItem = ({language, t, onlyFlag}) => {
  // Note that the block with "float" (the flag) must be first in the containing div
  return (
    <div>
      <img className={styles.flag} src={require(`../../assets/graphics/flag_${language}.svg`)}/>
      <div className={styles.language + (onlyFlag ? ' ' + styles.onlyFlag : '')}>
        {translateTag(t, 'language', language)}
      </div>
    </div>
  );
};

LanguageItem.propTypes = {
  // ownProps
  onlyFlag: PropTypes.bool.isRequired,

  // mapStateToProps
  language: PropTypes.oneOf(availableLanguages).isRequired,
  t: PropTypes.func.isRequired
};

const LanguageDropdown = ({isStudentMode, language, resetFilter, setLanguage, t}) => {
  const mode = isStudentMode ? 'student' : 'teacher';
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='language-dropdown'
      noCaret
      pullRight
      bsStyle={'language-' + mode}
      title={<LanguageItem onlyFlag={true} {...{language, t}}/>}
      onSelect={(eventKey) => {
        resetFilter('language', eventKey);
        setLanguage(eventKey);
      }}>
      {
        availableLanguages.map(key =>
          <MenuItem {...{key}} eventKey={key} active={language === key}>
            <LanguageItem onlyFlag={false} language={key} {...{t}}/>
          </MenuItem>
        )
      }
    </DropdownButton>
  </div>;
};

LanguageDropdown.propTypes = {
  // mapStateToProps:
  language: PropTypes.oneOf(availableLanguages).isRequired,
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,

  // mapDispatchToProps:
  setLanguage: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
  isStudentMode: state.isStudentMode
});

const mapDispatchToProps = {
  setLanguage,
  resetFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LanguageDropdown));
