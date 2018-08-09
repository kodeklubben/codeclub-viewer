import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import LessonItem from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import {getPlaylistsForCourse, getPlaylistLessons, getPlaylistTitle} from '../../resources/playlists';
import {areAllLessonsInPlaylistTranslated} from '../../resources/utils/playlistLessons';

const styles = theme => ({
  container: {
    marginTop: '31px',
  },
  panel: {
    marginTop: theme.spacing.unit,
  },
  headerText: {
    fontSize: '1.75em',
  },
  studentRoot: {
    backgroundColor: green[200],
  },
  teacherRoot: {
    backgroundColor: blue[200],
  },
});

class PlaylistNavigation extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = index => (event, expanded) => {
    this.setState({
      expanded: expanded ? index : false,
    });
  };

  render() {
    const {classes, course, language, t, isStudentMode} = this.props;
    const {expanded} = this.state;
    const playlists = getPlaylistsForCourse(course);
    const playlistListItems = playlists.map((playlist, index) => {
      const lessons = getPlaylistLessons(course, playlist);
      const title = getPlaylistTitle(course, playlist, language) || t('coursepage.missingtitle');
      const header = <h4 role='presentation'>{title}</h4>;
      return (
        <ExpansionPanel
          key={playlist}
          expanded={expanded === index}
          onChange={this.handleChange(index)}
          className={classes.panel}
        >
          <ExpansionPanelSummary
            classes={{root: isStudentMode ? classes.studentRoot : classes.teacherRoot}}
            expandIcon={<ExpandMoreIcon/>}
          >
            {header}
          </ExpansionPanelSummary>
          {areAllLessonsInPlaylistTranslated(course, playlist, language) ?
            lessons.map(lesson =>
              <div key={lesson}>
                <Divider/>
                <LessonItem key={lesson} {...{course, lesson, language}}/>
              </div>
            )
            :
            <ExpansionPanelDetails classes={{root: isStudentMode ? classes.studentContent : classes.teacherContent}}>
              {t('coursepage.lessonsnottranslated')}
            </ExpansionPanelDetails>
          }
        </ExpansionPanel>
      );
    });

    return (
      playlists.length > 0 ?
        <div className={classes.container}>
          <h2 className={classes.headerText}>{t('coursepage.lessoncollections')}</h2>
          {playlistListItems}
        </div> :
        null
    );
  }
}

PlaylistNavigation.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,

  // mapStateToProps
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
  isStudentMode: state.isStudentMode,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistNavigation));
