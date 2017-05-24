import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {doNotShowAgain} from '../../localStorage';
import styles from './WelcomeBox.scss';
import ButtonItem from '../ButtonItem';
import {getTranslator} from '../../selectors/translate';

const WelcomeBox = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    const {t} = this.props;
    const localStorage = this.props.localStorage;

    if(!localStorage.hideWelcomeBox) {
      return (
        <div className={styles.center}>
          <div className={styles.infoBox}>
            <h3 className={styles.center}>
            {t('frontpage.welcomebox.header')}</h3>
            <Button className={styles.xSign} onClick={() => doNotShowAgain()}>
              <Glyphicon glyph="remove"/>
            </Button>
            <br />
            {t('frontpage.welcomebox.changemode')}
            <br /><br />
            {t('frontpage.welcomebox.info')}
            <br /><br />
            <div className={styles.center}>
              {localStorage.lastLesson === '' ?
              <ButtonItem color='green' onClick={() => this.context.router.push(t('frontpage.welcomebox.buttonlink'))}>
                {t('frontpage.welcomebox.startbutton')}
              </ButtonItem>
              :
              <ButtonItem color='green' onClick={() => this.context.router.push(localStorage.lastLesson)}>
                {t('frontpage.welcomebox.continuebutton')}
              </ButtonItem>}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
      <div className={styles.center}>
       {localStorage.lastLesson === '' ?
        <ButtonItem color='green' onClick={() => this.context.router.push('/scratch/astrokatt/astrokatt')}>
          {t('frontpage.welcomebox.startbutton')}
        </ButtonItem>
        :
        <ButtonItem color='green' onClick={() => this.context.router.push(localStorage.lastLesson)}>
          {t('frontpage.welcomebox.continuebutton')}
        </ButtonItem>}
      </div>);
    }
  }

});

WelcomeBox.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  isStudentMode: PropTypes.bool,
  localStorage: PropTypes.object,
  t: PropTypes.func,
  lastLesson: PropTypes.number
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state),
    localStorage: state.localStorage
  };
}

export default connect(
  mapStateToProps,
  {doNotShowAgain}
)(withStyles(styles)(WelcomeBox));
