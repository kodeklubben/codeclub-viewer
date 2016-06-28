import React from 'react';

import style from './buttons.scss';

const TeacherPage = React.createClass({

  render() {
    const hrefAssistant = 'http://kidsakoder.no/kodeklubben/';
    const hrefTeacher = 'http://kidsakoder.no/skole/';

    return (
      <div>
        <div className={style.teacherContainer}>
          <div className={style.sectionTeacher}>
            <h3>Modus</h3>
            <p>
              Du er nå i lærermodus! <br /><br />
              Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
              Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
            </p>
          </div>

          <div className={style.sectionTeacherInline}>
            <h3>Lærere</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <a className={style.link} href={hrefTeacher}>Lær mer</a>
          </div>

          <div className={style.sectionTeacherInline}>
            <h3>Veiledere</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <a className={style.link} href={hrefAssistant}>Lær mer</a>
          </div>
        </div>
      </div>
    );
  }

});

export default TeacherPage;
