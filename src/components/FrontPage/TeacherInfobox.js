import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Collapse from 'react-bootstrap/lib/Collapse';

import styles from './TeacherInfobox.scss';

const TeacherInfobox = React.createClass({

  render() {
    const url = [
      'http://kidsakoder.no/skole/valgfag/',
      'http://kidsakoder.no/kodeklubben/'
    ];

    return (
      <div>
        <Collapse in={!this.props.isStudentMode}>
          <div className={styles.infoBox}>
            <div className={styles.infoBoxRow}>
              <div className={styles.infoBoxItem}>
                Du er nå lærermodus!
                <br /><br />
                Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
                Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
              </div>
            </div>
            <div className={styles.infoBoxRow}>
              <div>
                <h3>Lærer</h3>
                  Lær Kidsa Koding har gjennom flere år med undervisning i programmering
                  gjort seg mange erfaringer og har produsert mye læringsmateriell. Her
                  finner du informasjon om programmering som valgfag, forsøkslærerplanen,
                  og hvilke skoler som skal delta i pilotprosjektet.
                <br /><br />
                <a className={styles.link} href={url[0]}>Lær mer</a>
              </div>
              <div>
                <h3>Veileder</h3>
                  Som veileder ved en kodeklubb er du i en unik posisjon til å hjelpe barn
                  og unge med å komme i gang med programmering og å inspirere til videre utvikling.
                  Her finner du nyttige ressurser til oppgaver for nybegynnere og viderekomne, og
                  informasjon om hvordan du kan starte din egen kodeklubb.
                <br /><br />
                <a className={styles.link} href={url[1]}>Lær mer</a>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }

});

TeacherInfobox.propTypes = {
  isStudentMode: PropTypes.bool
};

export default withStyles(styles)(TeacherInfobox);
