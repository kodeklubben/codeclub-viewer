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
const modes = ['student', 'teacher'];

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
  language: PropTypes.oneOf(availableLanguages).isRequired,
  t: PropTypes.func.isRequired,
  onlyFlag: PropTypes.bool.isRequired
};

const LanguageDropdown = ({mode, language, resetFilter, setLanguage, t}) => {
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='language-dropdown'
                    noCaret
                    pullRight
                    bsStyle={'language-' + mode}
                    title={<LanguageItem onlyFlag={true} language={language} t={t}/>}
                    onSelect={(eventKey) => {
                      resetFilter('language', eventKey);
                      setLanguage(eventKey);
                    }}>
      {
        availableLanguages.map(k =>
          <MenuItem key={k} eventKey={k} active={language === k}>
            <LanguageItem onlyFlag={false} language={k} t={t}/>
          </MenuItem>
        )
      }
    </DropdownButton>
  </div>;
};

LanguageDropdown.propTypes = {
  // ownProps:
  mode: PropTypes.oneOf(modes).isRequired,

  // mapStateToProps:
  language: PropTypes.oneOf(availableLanguages).isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps:
  setLanguage: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    language: state.language,
    t: getTranslator(state)
  };
}

const mapDispatchToProps = {
  setLanguage,
  resetFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LanguageDropdown));
