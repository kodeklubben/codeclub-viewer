import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import styles from './Footer.scss';

const Footer = React.createClass({

  render() {
    const url = [
      'https://github.com/kodeklubben/oppgaver/',
      'http://kidsakoder.no/',
      'https://github.com/kodeklubben/kodeklubben.github.io/archive/master.zip',
      'http://kidsakoder.no/2015/07/03/kodeklubben-trondheim-utvikler-materiell-i-sommer/'
    ];

    return (
      <Grid fluid={true} className={styles.container}>
        <Row className={styles.center}>
          <p>Bidra?</p>
        </Row>
        <Row className={styles.center}>
          <a href={url[0]}>
            <img className={styles.svg} src={'src/assets/graphics/github.svg'}/>
          </a>
        </Row>
        <Row>
          <div className={styles.divider}/>
        </Row>
        <Row className={styles.center}>
          <div className={styles.linkGroup}>
            <a href={url[1]}>kidsakoder.no</a>
          </div>
          <div className={styles.linkGroup}>
            <a href={url[2]}>Last ned alle kurs som zip-fil</a>
          </div>
        </Row>
        <Row className={styles.center}>
          <a href={url[3]}>
            <img className={styles.img} src={'src/assets/graphics/smn.jpg'}/>
          </a>
          <a href={url[3]}>
            <img className={styles.img} src={'src/assets/graphics/ibok.jpg'}/>
          </a>
        </Row>
      </Grid>
    );
  }

});

export default withStyles(styles)(Footer);
