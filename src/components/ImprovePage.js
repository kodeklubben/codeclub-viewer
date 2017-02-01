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
            <div className={styles.infoBoxRow}>
              <div>
                <h2 className={styles.fontInfoBox}>Problemer</h2>
                
                <a className={styles.link} href={url.problemer}>Lær mer</a>
              </div>
              <div>
                <h2 className={styles.fontInfoBox}>Kode</h2>
                <a className={styles.link} href={url.kode}>Lær mer</a>
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
