import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './WelcomeBox.scss';
import {getTranslator} from '../../selectors/translate';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import {setWelcomeBox} from '../../action_creators';

const WelcomeBox = ({t, welcomeBox, setWelcomeBox}) => {
  const startButton = <div className={styles.center}>
    <LinkContainer to={t('frontpage.welcomebox.buttonlink')}>
      <Button bsStyle='student-frontpage'>
        {t('frontpage.welcomebox.startbutton')}
      </Button>
    </LinkContainer>
  </div>;

  return welcomeBox ?
    <div className={styles.center}>
      <div className={styles.infoBox}>
        <h3 className={styles.center}>
          {t('frontpage.welcomebox.header')}</h3>
        <Button className={styles.xSign} onClick={() => setWelcomeBox(false)}>
          <Glyphicon glyph="remove"/>
        </Button>
        <br />
        {t('frontpage.welcomebox.changemode')}
        <br /><br />
        {t('frontpage.welcomebox.info')}
        <br /><br />
        {startButton}
      </div>
    </div> :
    startButton;
};

WelcomeBox.propTypes = {
  t: PropTypes.func,
  welcomeBox: PropTypes.bool,
  setWelcomeBox: PropTypes.func,
  checkboxes: PropTypes.object
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  welcomeBox: state.welcomeBox,
  checkboxes: state.checkboxes
});


export default connect(
  mapStateToProps,
  {setWelcomeBox}
)(withStyles(styles)(WelcomeBox));
