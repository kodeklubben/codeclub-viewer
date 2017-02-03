import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import styles from './ImprovePage.scss';

const ImprovePage = React.createClass({

  render() {
    const url = {
      problemer: 'https://github.com/kodeklubben/oppgaver/issues/new/',
      kode: 'https://github.com/kodeklubben/oppgaver/'
    };

    return (
      
      <Grid fluid={true} className={this.props.isStudentMode ? styles.infoBoxTeacher : styles.infoBoxStudent}>
          <div className={styles.infoBox}>
            <div>
              <h3>Forbedre denne siden</h3>
              <p>Funnet en feil? Kunne noe vært bedre? Hvis ja, vennligst gi oss tilbakemelding ved å lage en sak på Github eller fiks feilen selv om du kan. Vi er takknemlige for enhver tilbakemelding!</p>
            </div>
            <div className={styles.infoBoxRow}>
                <div>
                  <a className={styles.link} href={url.problemer}>Rapporter et problem</a>
                </div>
                <div>
                  <a className={styles.link} href={url.kode}>Vis koden og fiks selv</a>
                </div>
            </div>
          </div>
      </Grid>
    );
  }
});

ImprovePage.propTypes = {
  isStudentMode: PropTypes.bool
};
export default withStyles(styles)(ImprovePage);
