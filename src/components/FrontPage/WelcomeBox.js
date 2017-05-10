import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {doNotShowAgain} from '../../localStorage';
import styles from './WelcomeBox.scss';
import ButtonItem from '../ButtonItem';

const WelcomeBox = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    const localStorage = this.props.localStorage;

    if(!localStorage.hideWelcomeBox) {
      return (
        <div className={styles.center}>
          <div className={styles.infoBox}>
            <h3 className={styles.center}>
            Hei! Du er nå i elevmodus</h3>
            <Button className={styles.xSign} onClick={doNotShowAgain}>
              <Glyphicon glyph="remove"/>
            </Button>
            <br />
            Er du ikke er en elev? Klikk elev / lærer-knappen i
            navigasjonsmenyen for å bytte modus. Du kan også velge å skjule
            denne boksen for alltid, ved å trykke på X i hjørnet
            <br /><br />
            Velkommen til Kodeklubbens oppgavesider! Her finner du mange
            veiledninger som du kan bruke som inspirasjon for å lære deg
            programmering og lage dine egne spill, apper og nettsider. For
            nybegynnere anbefaler vi å ta en titt på de blokkbaserte oppgavene i
            Code Studio eller Scratch. Bruk gjerne filtrene på venstre side til 
            å finne oppgaver som passer for deg!
            <br /><br />
            <div className={styles.center}>
              {localStorage.lastLesson === 0 ?
              <ButtonItem color='green' onClick={() => this.context.router.push('/scratch/astrokatt/astrokatt')}>
                Start her!
              </ButtonItem>
              :
              <ButtonItem color='green'>Fortsett...</ButtonItem>}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
      <div className={styles.center}>
       {localStorage.lastLesson === 0 ?
        <ButtonItem color='green' onClick={() => this.context.router.push('/scratch/astrokatt/astrokatt')}>
          Start her!
        </ButtonItem>
        :
        <ButtonItem color='green'>Fortsett...</ButtonItem>}
      </div>);
    }
  }

});

WelcomeBox.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  isStudentMode: PropTypes.bool,
  localStorage: PropTypes.object,
  language: PropTypes.string,
  lastLesson: PropTypes.number
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
