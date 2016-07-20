import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import styles from './Footer.scss';

const Footer = React.createClass({

  render() {
    return (
      <Grid fluid={true} className={styles.container}>
        <Row className={styles.center}>
          <p>Bidra?</p>
        </Row>
        <Row className={styles.center}>
          <a href='#clicked'>
            <img className={styles.svg} src={'src/assets/graphics/github.svg'}/>
          </a>
        </Row>
        <Row>
          <div className={styles.divider}/>
        </Row>
        <Row className={styles.center}>
          <div className={styles.linkGroup}>
            <a href='#clicked'>kidsakoder.no</a>
          </div>
          <div className={styles.linkGroup}>
            <a href='#clicked'>Last ned alle kurs som zip-fil</a>
          </div>
        </Row>
        <Row className={styles.center}>
          <img className={styles.img} href='#clicked' src={'src/assets/graphics/smn.jpg'}/>
          <img className={styles.img} href='#clicked' src={'src/assets/graphics/ibok.jpg'}/>
        </Row>
      </Grid>
    );
  }

});

export default withStyles(styles)(Footer);
