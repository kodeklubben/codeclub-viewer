import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Collapse from 'react-bootstrap/lib/Collapse';

import styles from './ImprovePage.scss';

const ImprovePage = React.createClass({

  render() {
    const url = {
      problemer: 'https://github.com/kodeklubben/oppgaver/issues/new/',
      kode: 'https://github.com/kodeklubben/oppgaver/'
    };

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
                <h3>Problemer</h3>
                
                <a className={styles.link} href={url.problemer}>Lær mer</a>
              </div>
              <div>
               
                <a className={styles.link} href={url.kode}>Lær mer</a>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }

});

ImprovePage.propTypes = {
  isStudentMode: PropTypes.bool
};

export default withStyles(styles)(ImprovePage);
