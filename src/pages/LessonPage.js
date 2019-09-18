/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LessonPage.scss';
import LevelIcon from '../components/LevelIcon';
import ToggleButton from '../components/LessonPage/ToggleButton';
import ImprovePage from '../components/LessonPage/ImprovePage.js';
import {getTranslator} from '../selectors/translate';
import {setLastLesson} from '../reducers/lastLesson';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Progress from '../components/LessonPage/Progress';
import ButtonRow from '../components/LessonPage/ButtonRow';
import Content from '../components/LessonPage/Content';
import {getLessonTitle, getLessonAuthor, getLessonTranslator, getLessonPath} from '../resources/lessonFrontmatter';
import {getLessonIntroText} from '../resources/lessonContent';
import {getLevel, getLicense} from '../resources/lessons';
import Head from '../components/Head';
import PrintInfo from '../components/LessonPage/PrintInfo';

const renderToggleButtons = () => {
  const nodes = [...document.getElementsByClassName('togglebutton')];
  for (let node of nodes) {
    const strongNode = node.getElementsByTagName('strong')[0];
    const buttonText = strongNode ? strongNode.textContent : 'Hint';
    const hiddenNode = node.getElementsByTagName('hide')[0];
    const hiddenHTML = hiddenNode ? hiddenNode.innerHTML : '';
    ReactDOM.render(<ToggleButton {...{buttonText, hiddenHTML}}/>, node);
  }
};

const renderSpinner = course => {
  if (course === 'microbit') {
    const pres = [...document.getElementsByTagName('pre')];
    for (let pre of pres) {
      if ([...pre.childNodes][0].className === 'python') return;
      pre.style.display = 'none';
      let img = document.createElement('img');
      img.id = 'spinner';
      img.src = require('../assets/graphics/spinner.gif');
      img.alt = 'Spinner';
      img.width = '50';
      img.height = '50';
      img.style.maxWidth = '100%';
      img.style.display = 'block';
      img.style.margin = '0 auto 15px';
      pre.parentElement.insertBefore(img, pre);
    }
  }
};

class LessonPage extends React.PureComponent {
  componentDidMount() {
    const {course, lesson, language, isReadme, setLastLesson} = this.props;
    const path = getLessonPath(course, lesson, language, isReadme);
    setLastLesson(path);
    renderSpinner(course);
    renderToggleButtons();
  }

  render() {
    const {course, lesson, language, isReadme, t} = this.props;
    const title = getLessonTitle(course, lesson, language, isReadme);
    const author = getLessonAuthor(course, lesson, language, isReadme);
    const translator = getLessonTranslator(course, lesson, language, isReadme);
    const license = getLicense(course, lesson);
    const authorNode = author ?
      <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={author} inline={true} /></i></p> : null;
    const translatorNode = translator ? <p><i>{t('lessons.translatedby')} {translator}</i></p> : null;
    const licenseRow = <div className={styles.license}>
      {t('lessons.license')}
      {license ?
        <MarkdownRenderer src={license} inline={true}/> :
        <a href='http://creativecommons.org/licenses/by-sa/4.0/deed' target='_blank' rel='noopener'>CC BY-SA 4.0</a>
      }
    </div>;
    return (
      <div role='main'>
        <Head {...{title}} description={getLessonIntroText(course, lesson, language, isReadme)}/>
        <div className={styles.container}>
          <h1>
            <LevelIcon level={getLevel(course, lesson)}/>
            {title}
          </h1>
          {authorNode}
          {translatorNode}
          <PrintInfo {...{course, lesson}}/>
          <ButtonRow {...{course, lesson, language, isReadme}}/>
          <Progress {...{course, lesson, language, isReadme}}/>
          <Content {...{course, lesson, language, isReadme}}/>
          {licenseRow}
          <ImprovePage {...{course, lesson, language, isReadme}}/>
        </div>
      </div>
    );
  }
}

LessonPage.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setLastLesson: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

const mapDispatchToProps = {
  setLastLesson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LessonPage));
