import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LevelIcon from '../components/LevelIcon';
import ToggleButton from '../components/LessonPage/ToggleButton';
import ImprovePage from '../components/LessonPage/ImprovePage.js';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ButtonRow from '../components/LessonPage/ButtonRow';
import Content from '../components/LessonPage/Content';
import Head from '../components/Head';
import PrintInfo from '../components/LessonPage/PrintInfo';
import {getTranslator} from '../selectors/translate';
import {setCheckboxes, createCheckboxesKey} from '../utils/checkboxUtils';
import {setCheckbox} from '../reducers/checkboxes';
import {setLastLesson} from '../reducers/lastLesson';
import {getLessonFrontmatter} from '../resources/lessonFrontmatter';
import {getLessonIntroText} from '../resources/lessonContent';
import {getLevel, getLicense} from '../resources/lessons';

const styles = theme => ({
  container: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.85em',
    },
    '& figure > img': {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 20,
      maxWidth: '100%',
      height: 'auto',
    },
  },
  license: {
    margin: '30px 0',
  },
});

const renderToggleButtons = () => {
  const nodes = [...document.getElementsByClassName('togglebutton')];
  for (let node of nodes) {
    const strongNode = node.getElementsByTagName('strong')[0];
    const buttonText = strongNode ? strongNode.textContent : 'Hint';
    const hiddenNode = node.getElementsByTagName('hide')[0];
    const hiddenHTML = hiddenNode ? hiddenNode.innerHTML : '';
    ReactDOM.render(<ToggleButton {...{buttonText, hiddenHTML}}/>,node);
  }
};

class LessonPage extends React.Component {
  componentDidMount() {
    const {path, checkboxes, setCheckbox, setLastLesson} = this.props;
    setCheckboxes(path, checkboxes, setCheckbox);
    setLastLesson(path);
    renderToggleButtons();
  }

  render() {
    const {
      classes, course, lesson, language, isReadme,
      t, title, author, translator, license,
    } = this.props;
    const authorNode = author ?
      <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={author} inline={true} /></i></p> : null;
    const translatorNode = translator ? <p><i>{t('lessons.translatedby')} {translator}</i></p> : null;
    const licenseRow = <div className={classes.license}>
      {t('lessons.license')}
      {license ?
        <MarkdownRenderer src={license} inline={true}/> :
        <a href='http://creativecommons.org/licenses/by-sa/4.0/deed' target='_blank' rel='noopener'>CC BY-SA 4.0</a>
      }
    </div>;
    return (
      <div className={classes.container} role='main'>
        <Head {...{title}} description={getLessonIntroText(course, lesson, language, isReadme)}/>
        <Typography variant='headline'>
          <LevelIcon level={getLevel(course, lesson)}/>
          {title}
        </Typography>
        {authorNode}
        {translatorNode}
        <PrintInfo {...{course, lesson}}/>
        <ButtonRow {...{course, lesson, language, isReadme}}/>
        <Content {...{course, lesson, language, isReadme}}/>
        {licenseRow}
        <ImprovePage {...{course, lesson, language, isReadme}}/>
      </div>
    );
  }
}

LessonPage.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  translator: PropTypes.string.isRequired,
  license: PropTypes.string,
  checkboxes: PropTypes.object,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired,
  setLastLesson: PropTypes.func.isRequired
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => {
  const {path, title, author, translator} = getLessonFrontmatter(course, lesson, language, isReadme);
  return {
    t: getTranslator(state),
    path,
    title,
    author,
    translator,
    license: getLicense(course, lesson),
    checkboxes: state.checkboxes[createCheckboxesKey(path)] || {},
  };
};

const mapDispatchToProps = {
  setCheckbox,
  setLastLesson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LessonPage));
