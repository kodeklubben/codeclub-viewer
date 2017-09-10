import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './MainLanguageButton.scss';
import {getReadmeForMainLanguage, getLessonForMainLanguage} from '../../util';
import {getTranslator} from '../../selectors/translate';

const MainLanguageButton = ({path, t, isReadme, language}) => {
  const buttonPath = isReadme ?
    getReadmeForMainLanguage(path, language) :
    getLessonForMainLanguage(path, language);
  const className = styles.container;
  const bsStyle = 'info';
  const bsSize = 'small';
  return buttonPath === null ? null :
    <LinkContainer to={buttonPath}>
      <Button {...{className, bsStyle, bsSize}}>
        {t('lessons.tomainlanguage')}
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
  language: state.language,
  isReadme: state.context.readmeContext.keys().indexOf('./' + path + '.md') !== -1,
});

export default connect(
  mapStateToProps
  )(withStyles(styles)(MainLanguageButton));
