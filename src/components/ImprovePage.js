import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import styles from './ImprovePage.scss';

const ImprovePage = React.createClass({

  render() {      

    const githubPath = location.pathname.replace(location.pathname.split("/").pop(), "");

    //make new issue link

    const url = {
      //må linke med Oppgavetype (python) : oppgavetittel og tekst ("Beskriv ditt problem...") i body
      problemer: 'https://github.com/kodeklubben/oppgaver/issues/new/',
      //må linke til kodekilden i databaserepoet
      kode: 'https://github.com/kodeklubben/oppgaver/tree/master/src' + githubPath
    };
    return (
      
      <Grid fluid={true} className={this.props.isStudentMode ? styles.infoBoxStudent : styles.infoBoxTeacher}>
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

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export const ImprovePageContainer = connect(
  mapStateToProps,
)(withStyles(styles)(ImprovePage));

