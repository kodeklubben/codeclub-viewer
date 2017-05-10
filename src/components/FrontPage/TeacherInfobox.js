import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TeacherInfobox.scss';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const TeacherInfobox = React.createClass({

  getInitialState() {
    return {
      showCourseInfo: false
    };
  },
  changeState() {
    this.setState({['showCourseInfo']: !this.state['showCourseInfo']});
  },

  render() {
    const url = [
      'http://kidsakoder.no/skole/valgfag/',
      'http://kidsakoder.no/kodeklubben/'
    ];

    return (
      <div className={styles.center}>
        {!this.props.isStudentMode ?
          <div className={styles.infoBox}>
            <h3 className={styles.center}>Hei! Du er nå i lærermodus</h3>
            <br />
            Er du ikke er en lærer eller veileder? Klikk elev / lærer-knappen i
            navigasjonsmenyen for å bytte modus. Du kan få mer informasjon ved å trykke på plusstegnet under
            <br />
            <div className={styles.center}>
              <Button className={styles.plusSign} onClick={() => this.changeState()}>
                <Glyphicon glyph={!this.state.showCourseInfo ? 'plus-sign' : 'minus-sign'}/>
              </Button>
            </div>
            <Collapse in={this.state.showCourseInfo}>
              <div>
                <h3>Lærer</h3>
                Sjekk ut våre filtre og oppgaveveiledninger. På venstre side kan du filtrere
                på ulike skole-fag, for å finne relevante oppgaver til din undervisning. Når
                du har huket av for fag så vil du kun se kun de oppgavene som våre lærere har vurdert
                som relevante, og du kan velge hvilket språk du vil undervise i. Hvert oppgavesett har en
                veiledning, og der finner du bl.a. hvilke konkrete læreplanmål man kan jobbe med i de ulike fagene.
                <br />
                <a className={styles.link} href={url[0]} target="_blank">Lær mer om programmering i undervisningen</a>
                <br />
                <h3>Veileder</h3>
                Våre oppgavesett legger opp til at barna jobber mye på egenhånd med ulike prosjekter,
                men vi anbefaler å starte hver økt  med 10-15 min intro til hva man skal gjøre og hva som
                eventuelt er nytt denne gangen. Nå kan du enkelt filtrere oppgaver på temaer, og alle oppgavesett
                har veiledninger du kan sjekke ut som forberedelse til øktene. For nybegynnere så anbefaler vi
                blokkbasert programmering, hvor Python / Web / Processing er de vanligste å gå videre med etterpå.
                <br />
                <a className={styles.link} href={url[1]} target="_blank">Lær mer om å drive en kodeklubb</a>
              </div>
            </Collapse>
          </div>
          : null}
      </div>
    );
  }

});

TeacherInfobox.propTypes = {
  isStudentMode: PropTypes.bool,
  language: PropTypes.string
};

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

export default connect(
  mapStateToProps
)(withStyles(styles)(TeacherInfobox));
