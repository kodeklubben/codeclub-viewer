import React from 'react';

import style from '../components/buttons.scss';

export default class TeacherPage extends React.Component {

  constructor() {
    super();

    this.links = new Map([
      ["assistant", "http://kidsakoder.no/kodeklubben/"],
      ["teacher", "http://kidsakoder.no/skole/"]
    ]);
  }

  render() {
    return (
      <div>
        <h3>Modus</h3>
        <p>
          Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
          Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
        </p>
        <h3>Lærere</h3>
        <p>
          text text text text text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text text text text text
        </p>
        <a href={this.links.get("teacher")}>Lær mer</a>
        <h3>Veildere</h3>
        <p>
          text text text text text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text text text text text
        </p>
        <a href={this.links.get("assistant")}>Lær mer</a>
      </div>
    );
  }

}
