import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getTeacherInfo} from '../../util';
import styles from './TeacherInfobox.scss';

const TeacherInfobox = React.createClass({

  render() {
    const url = [
      'http://kidsakoder.no/skole/valgfag/',
      'http://kidsakoder.no/kodeklubben/'
    ];

    const teacherInfoContext = require.context('onlyFrontmatter!lessonSrc/', false, /index\.md/);
    const teacherInfo = getTeacherInfo(teacherInfoContext);

    return (
      <div className={styles.infoBoxContainer}>
        {!this.props.isStudentMode ?
          <div className={styles.infoBox}>
            <div className={styles.infoBoxRow}>
              <div className={styles.infoBoxItem}>
                Du er nå i lærermodus!
                <br /><br />
                Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
                Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
              </div>
            </div>
            <div className={styles.infoBoxRow}>
              <div>
                <h3>Lærer</h3>
                {teacherInfo.teacher}
                <br /><br />
                <a className={styles.link} href={url[0]}>Lær mer</a>
              </div>
              <div>
                <h3>Veileder</h3>
                {teacherInfo.assistant}
                <br /><br />
                <a className={styles.link} href={url[1]}>Lær mer</a>
              </div>
            </div>
          </div>
      : null}
      </div>
    );
  }

});

TeacherInfobox.propTypes = {
  isStudentMode: PropTypes.bool,

};

export default (withStyles(styles)(TeacherInfobox));

