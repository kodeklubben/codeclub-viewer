import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './WelcomeBox.scss';
import {getTranslator} from '../../selectors/translate';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import {doNotShowAgain} from '../../localStorage';

const WelcomeBox = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    const {t} = this.props;

    if(localStorage.hideWelcomeBox === 'false') {
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
              <LinkContainer to={t('frontpage.welcomebox.buttonlink')}>
                <Button bsStyle='student-frontpage'>
                  {t('frontpage.welcomebox.startbutton')}
                </Button>
              </LinkContainer>
              :
              <LinkContainer to={localStorage.lastLesson}>
                <Button bsStyle='student-frontpage'>
                  {t('frontpage.welcomebox.continuebutton')}
                </Button>
              </LinkContainer>}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
      <div className={styles.center}>
       {localStorage.lastLesson === '' ?
       <LinkContainer to={t('frontpage.welcomebox.buttonlink')}>
         <Button bsStyle='student-frontpage'>
           {t('frontpage.welcomebox.startbutton')}
         </Button>
       </LinkContainer>
        :
        <LinkContainer to={localStorage.lastLesson}>
          <Button bsStyle='student-frontpage'>
            {t('frontpage.welcomebox.continuebutton')}
          </Button>
        </LinkContainer>}
      </div>);
    }
  }

});

WelcomeBox.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state),
  };
}

export default connect(
  mapStateToProps
)(withStyles(styles)(WelcomeBox));
