import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Collapse from 'react-bootstrap/lib/Collapse';
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
      <Collapse in={!this.props.isStudentMode}>
        <Grid className={styles.infoBox} fluid={true}>
          <Row className={styles.center}>
            <Col xs={12} md={12}>
                Du er nå lærermodus!
                <br /><br />
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
              <a className={styles.link} href={url[0]}>Lær mer</a>
            </Col>
            <Col xs={6} md={6}>
              <a className={styles.link} href={url[1]}>Lær mer</a>
            </Col>
          </Row>
        </Grid>
      </Collapse>
    );
  }

});

TeacherInfobox.propTypes = {
  isStudentMode: PropTypes.bool,
};

export default (withStyles(styles)(TeacherInfobox));
