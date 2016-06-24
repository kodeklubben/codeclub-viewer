import React from 'react';
import { Link } from 'react-router';

import style from './buttons.scss';
import Teacher from '../pages/TeacherPage';
import Student from '../pages/StudentPage';

export default class FrontPageButton extends React.Component {

  constructor() {
    super();
    this.state = {
      info: null,
    };
  }

  setContent(info) {
    this.setState({info});
  }

  render() {
    return (
      <div className={style.container}>
          <div className={style.sectionCol}>
            <div className={style.button} onClick={() => this.setContent(<Student />)}>
              Kom i gang!
            </div>

            <div className={style.button} onClick={() => this.setContent(<Teacher />)}>
              Lærer/Veileder
            </div>
          </div>

          <div className={style.section}>
            <div className={style.info}>
              {this.state.info}
            </div>
          </div>
      </div>
    );
  }

}
