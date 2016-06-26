import React from 'react';

import style from './buttons.scss';
import Teacher from './TeacherPage';

export default class FrontPageButton extends React.Component {

  constructor() {
    super();

    this.state = {
      info: null
    };
  }

  displayTeacherContent(info) {
    this.setState({info});
  }

  navigate() {
    this.props.history.pushState(null, '/scratch/flagg/README');
  }

  render() {
    return (
      <div className={style.container}>
          <div className={style.sectionButton}>
            <button className={style.buttonStudent} onClick={() => this.navigate.bind(this)}>
              Kom i gang!
            </button>

            <button className={style.buttonTeacher} onClick={() => this.displayTeacherContent(<Teacher />).bind(this)}>
              Lærer/Veileder
            </button>
          </div>

          <div>
            <div className={style.sectionInfo}>
              {this.state.info}
            </div>
          </div>
      </div>
    );
  }

}
