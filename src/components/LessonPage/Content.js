import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Content.scss';
import {processContent} from '../../utils/processContent';
import {getLessonContent} from '../../resources/lessonContent';
import {getLessonPath} from '../../resources/lessonFrontmatter';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import {setCheckbox, removeCheckbox} from '../../reducers/checkboxes';
import {getCheckboxesForLesson} from '../../selectors/checkboxes';

class Content extends React.PureComponent {
  createMarkup = () => {
    const {course, lesson, language, isReadme, isHydrated} = this.props;
    const lessonContent = getLessonContent(course, lesson, language, isReadme);
    return {__html: processContent(lessonContent, styles, isHydrated)};
  };

  updateCheckboxes = () => {
    const {course, lesson, language, isReadme, checkboxes, setCheckbox, removeCheckbox} = this.props;
    const path = getLessonPath(course, lesson, language, isReadme);
    setCheckboxesInDoc(path, checkboxes, setCheckbox, removeCheckbox);
  };

  componentDidMount() {
    const f = document.createElement('iframe');
    f.id = 'makecoderenderer';
    f.style.position = 'absolute';
    f.style.left = 0;
    f.style.bottom = 0;
    f.style.width = '1px';
    f.style.height = '1px';            
    f.src = 'https://makecode.microbit.org/--docs?render=1';
    document.body.appendChild(f);
    // listen for messages
    window.addEventListener('message', ev => {
      let msg = ev.data;
      if (msg.source != 'makecode') return;
      switch (msg.type) {
        case 'renderready': {
          // start rendering snippets!
          let pres = document.getElementsByTagName('pre');
          Array.prototype.forEach.call(pres, pre => {
            const f = document.getElementById('makecoderenderer');
            f.contentWindow.postMessage({
              type: 'renderblocks',
              id: pre.id,
              code: pre.innerText
            }, 'https://makecode.microbit.org/');
          });
          break;
        }
        case 'renderblocks': {
          // replace text with img
          let img = document.createElement('img');
          img.src = msg.uri;
          img.width = msg.width;
          img.height = msg.height;
          img.style.display = 'block';
          img.style.margin = '0 auto 15px';
          let code = document.getElementsByTagName('pre')[0];
          if (code.className === 'microbit') {
            code.parentElement.insertBefore(img, code);
            code.parentElement.removeChild(code);
          }
          break;
        }
      }
    }, false);
    if (this.props.isHydrated) { this.updateCheckboxes(); } // When clicking in from different page
  }

  componentDidUpdate(prevProps) {
    const wasHydratedThisUpdate = !prevProps.isHydrated && this.props.isHydrated;
    if (wasHydratedThisUpdate) { this.updateCheckboxes(); } // When reloading page
  }

  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()}/>;
  }
}

Content.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  isHydrated: PropTypes.bool.isRequired, // require isHydrated as a prop to force rerender when it changes
  checkboxes: PropTypes.object,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired,
  removeCheckbox: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => ({
  isHydrated: state.hydration,
  checkboxes: getCheckboxesForLesson(state, course, lesson, language, isReadme),
});

const mapDispatchToProps = {
  setCheckbox,
  removeCheckbox,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Content));
