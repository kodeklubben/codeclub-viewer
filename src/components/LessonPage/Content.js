import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
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
    if (this.props.isHydrated) { this.updateCheckboxes(); } // When clicking in from different page
  }

  componentDidUpdate(prevProps) {
    const wasHydratedThisUpdate = !prevProps.isHydrated && this.props.isHydrated;
    if (wasHydratedThisUpdate) { this.updateCheckboxes(); } // When reloading page
  }

  render() {
    useStyles(styles)
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

export default connect(mapStateToProps, mapDispatchToProps)(Content);
