import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {
  ExpansionPanel, ExpansionPanelSummary, Typography, Divider, List, ListItem
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getTranslator} from '../../selectors/translate';
import {setExpandedAccordion} from '../../reducers/expandedAccordion';
import {getPlaylistsForCourse, getPlaylistLessons, getPlaylistTitle} from '../../resources/playlists';
import {areAllLessonsInPlaylistTranslated} from '../../resources/utils/playlistLessons';
import LessonItem from './LessonItem';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
  },
}));

const PlaylistNavigation = ({course}) => {
  const classes =  useStyles();

  const language = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));
  const expandedAccordion = useSelector(state => state.expandedAccordion);

  const dispatch = useDispatch();
  const handleChange = panel => {
    if (expandedAccordion[course] === panel) {
      panel = null;
    }
    dispatch(setExpandedAccordion(course, panel));
  };

  const playlists = getPlaylistsForCourse(course);
  const playlistListItems = playlists.map((playlist, i) => {
    const lessons = getPlaylistLessons(course, playlist);
    const title = getPlaylistTitle(course, playlist, language) || t('coursepage.missingtitle');
    return (
      <ExpansionPanel
        key={playlist}
        classes={{ root: classes.root }}
        onChange={() => handleChange(i)}
        expanded={expandedAccordion[course] === i}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color='primary'/>}>
          <Typography variant='h5'>{title}</Typography>
        </ExpansionPanelSummary>
        <Divider/>
        <List>
          {areAllLessonsInPlaylistTranslated(course, playlist, language) ?
            lessons.map(lesson => <LessonItem key={lesson} {...{course, lesson, language}}/>) :
            <ListItem>{t('coursepage.lessonsnottranslated')}</ListItem>
          }
        </List>
      </ExpansionPanel>
    );
  });

  return playlists.length > 0 ? playlistListItems : null;
};

PlaylistNavigation.propTypes = {
  course: PropTypes.string.isRequired,
};


export default PlaylistNavigation;
