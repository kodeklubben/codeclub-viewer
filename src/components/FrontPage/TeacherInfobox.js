import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
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
    const lang = this.props.language;

    return (
      <div className={styles.center}>
       {!this.props.isStudentMode ?
        <Grid className={styles.infoBox} fluid={true}>
          <Row>
            <Col xs={12} md={12}>
              <h3 className={styles.center}>{teacherInfo.welcomeTeacher[lang]}</h3>
              <br />
              {teacherInfo.changeModeTeacher[lang]}.
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <h3>Lærer</h3>
              {teacherInfo.teacher[lang]}
            </Col>
            <Col xs={6} md={6}>
              <h3>Veileder</h3>
              {teacherInfo.assistant[lang]}
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <a className={styles.link} href={url[0]} target="_blank">{teacherInfo.link1[lang]}</a>
            </Col>
            <Col xs={6} md={6}>
              <a className={styles.link} href={url[1]} target="_blank">{teacherInfo.link2[lang]}</a>
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