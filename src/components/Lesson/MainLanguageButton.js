import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './MainLanguageButton.scss';
import {getPathForMainLanguage} from '../../util';
import {getTranslator, getTranslateTag} from '../../selectors/translate';
import {readmeContext} from '../../contexts';

const MainLanguageButton = ({path, t, tt, isReadme, language}) => {
  const buttonPath = getPathForMainLanguage(path, language, isReadme);
  const className = styles.container;
  const bsStyle = 'info';
  const bsSize = 'small';
  return buttonPath === null ? null :
    <LinkContainer to={buttonPath}>
      <Button {...{className, bsStyle, bsSize}}>
        <Image
          className={styles.flag}
          src={require(`../../assets/graphics/flag_${language}.svg`)}
          alt={tt('language', language)}
        />
        <span className={styles.textMargin}>
          {t('lessons.tomainlanguage', {lang: tt('language', language)})}
        </span>
      </Button>
    </LinkContainer>;
};

MainLanguageButton.propTypes = {
  // ownProps
  path: PropTypes.string,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  tt: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  tt: getTranslateTag(state),
  language: state.language,
  isReadme: readmeContext.keys().includes('./' + path + '.md'),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(MainLanguageButton));
