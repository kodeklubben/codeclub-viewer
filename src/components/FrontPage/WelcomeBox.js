import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {doNotShowAgain} from '../../localStorage';
import styles from './WelcomeBox.scss';
import {getInfo} from '../../util';
import ButtonItem from '../ButtonItem';

const WelcomeBox = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    const welcomeBoxContext = require.context('onlyFrontmatter!lessonSrc/', false, /index\.md/);
    const welcomeInfo = getInfo(welcomeBoxContext);
    const lang = this.props.language;
    const localStorage = this.props.localStorage;

    if(!localStorage.hideWelcomeBox) {
      return (
        <div className={styles.center}>
          <div className={styles.infoBox}>
            <h3 className={styles.center}>
            {welcomeInfo.welcomeStudent[lang]}</h3>
            <Button className={styles.xSign} onClick={doNotShowAgain}>
              <Glyphicon glyph="remove"/>
            </Button>
            <br />
            {welcomeInfo.changeModeStudent[lang]}
            <br /><br />
            {welcomeInfo.student[lang]}
            <br /><br />
            <div className={styles.center}>
              {true ?
              <ButtonItem color='green' onClick={() => this.context.router.push(welcomeInfo.buttonLink[lang])}>
                {welcomeInfo.buttonText[lang]}
              </ButtonItem>
              :
              <ButtonItem color='green'>{welcomeInfo.continueButton[lang]}</ButtonItem>}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
      <div className={styles.center}>
       {true ?
        <ButtonItem color='green' onClick={() => this.context.router.push(welcomeInfo.buttonLink[lang])}>
          {welcomeInfo.buttonText[lang]}
        </ButtonItem>
        :
        <ButtonItem color='green'>{welcomeInfo.continueButton[lang]}</ButtonItem>}
      </div>);
    }
  }

});

WelcomeBox.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  isStudentMode: PropTypes.bool,
  localStorage: PropTypes.object,
  language: PropTypes.string
};

function mapStateToProps(state) {
  return {
    language: state.language,
    localStorage: state.localStorage
  };
}

export default connect(
  mapStateToProps,
  {doNotShowAgain}
)(withStyles(styles)(WelcomeBox));
