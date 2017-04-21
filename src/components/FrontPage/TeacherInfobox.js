import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {getInfo} from '../../util';

import styles from './TeacherInfobox.scss';

const TeacherInfobox = React.createClass({

  render() {
    const url = [
      'http://kidsakoder.no/skole/valgfag/',
      'http://kidsakoder.no/kodeklubben/'
    ];

    const teacherInfoContext = require.context('onlyFrontmatter!lessonSrc/', false, /index\.md/);
    const teacherInfo = getInfo(teacherInfoContext);

    return (
      <div className={styles.center}>
       {!this.props.isStudentMode ?
        <Grid className={styles.infoBox} fluid={true}>
          <Row>
            <Col xs={12} md={12}>
              <h3 className={styles.center}>Hei! Du er nå i lærermodus</h3>
              <br />
              Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
              Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <h3>Lærer</h3>
              {teacherInfo.teacher}
            </Col>
            <Col xs={6} md={6}>
              <h3>Veileder</h3>
              {teacherInfo.assistant}
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <a className={styles.link} href={url[0]} target="_blank">Lær mer om programmering i undervisningen</a>
            </Col>
            <Col xs={6} md={6}>
              <a className={styles.link} href={url[1]} target="_blank">Lær mer om å drive en kodeklubb</a>
            </Col>
          </Row>
        </Grid>
        : null}
      </div>
    );
  }

});

TeacherInfobox.propTypes = {
  isStudentMode: PropTypes.bool,
};

export default (withStyles(styles)(TeacherInfobox));