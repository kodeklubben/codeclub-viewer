import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Content.scss';
import {processContent} from '../../utils/processContent';
import {getLessonContent} from '../../resources/lessonContent';

class Content extends React.PureComponent {
  createMarkup = (lessonContent, isHydrated) => ({__html: processContent(lessonContent, styles, isHydrated)});

  render() {
    const {course, lesson, language, isReadme, isHydrated} = this.props;
    const lessonContent = getLessonContent(course, lesson, language, isReadme);
    return <div dangerouslySetInnerHTML={this.createMarkup(lessonContent, isHydrated)}/>;
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
};

const mapStateToProps = (state) => ({
  isHydrated: state.hydration,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(Content));
