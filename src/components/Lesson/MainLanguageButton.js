import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './MainLanguageButton.scss';
import {getPathForMainLanguage} from '../../util';
import {getTranslator, getTranslateTag} from '../../selectors/translate';

const MainLanguageButton = ({path, t, tt, isReadme, language}) => {
  const buttonPath = getPathForMainLanguage(path, language, isReadme);
  const className = styles.container;
  const bsStyle = 'info';
  const bsSize = 'small';
  return buttonPath === null ? null :
    <LinkContainer to={buttonPath}>
      <Button {...{className, bsStyle, bsSize}}>
        {t('lessons.tomainlanguage', {lang: tt('language', language)})}
      </Button>
    </LinkContainer>;
};

MainLanguageButton.propTypes = {
  // ownProps
  path: PropTypes.string,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  tt: getTranslateTag(state),
  language: state.language,
  isReadme: state.context.readmeContext.keys().includes('./' + path + '.md'),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(MainLanguageButton));
