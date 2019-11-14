import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {processContent} from '../../utils/processContent';
import {renderMicrobit} from '../../utils/renderMicrobit';
import {getLessonContent} from '../../resources/lessonContent';
import {getLessonPath} from '../../resources/lessonFrontmatter';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import {getCheckboxesForLesson} from '../../selectors/checkboxes';
import {renderScratchBlocks} from '../../utils/renderScratchblocks';
import {renderToggleButtons} from '../../utils/renderToggleButtons';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  lessonContent: {
    '& img': {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
    },
    '& a': {
      color: theme.palette.primary.main,
    },
    '& code': {
      '&.blockmotion': { backgroundColor: '#4c97ff', color: '#fff', },
      '&.blocklooks': { backgroundColor: '#96f', color: '#fff', },
      '&.blocksound': { backgroundColor: '#cf63cf', color: '#fff', },
      '&.blockpen': { backgroundColor: '#0fbd8c', color: '#fff', },
      '&.blockdata': { backgroundColor: '#ff8c1a', color: '#fff', },
      '&.blockevents': { backgroundColor: '#ffbf00', color: '#fff', },
      '&.blockcontrol': { backgroundColor: '#ffab19', color: '#fff', },
      '&.blocksensing': { backgroundColor: '#5cb1d6', color: '#fff', },
      '&.blockoperators': { backgroundColor: '#59c059', color: '#fff', },
      '&.blockmoreblocks': { backgroundColor: '#ff6680', color: '#fff', },
      '&.microbitbasic': { backgroundColor: '#1e90ff', color: '#fff', },
      '&.microbitinput': { backgroundColor: '#d400d4', color: '#fff', },
      '&.microbitmusic': { backgroundColor: '#e63022', color: '#fff', },
      '&.microbitled': { backgroundColor: '#5c2d91', color: '#fff', },
      '&.microbitradio': { backgroundColor: '#e3008c', color: '#fff', },
      '&.microbitloops': { backgroundColor: '#0a0', color: '#fff', },
      '&.microbitlogic': { backgroundColor: '#00a4a6', color: '#fff', },
      '&.microbitvariables': { backgroundColor: '#dc143c', color: '#fff', },
      '&.microbitmath': { backgroundColor: '#9400d3', color: '#fff', },
      '&.microbitfunctions': { backgroundColor: '#3455db', color: '#fff', },
      '&.microbitarrays': { backgroundColor: '#e65722', color: '#fff', },
      '&.microbittext': { backgroundColor: '#b8860b', color: '#fff', },
      '&.microbitgame': { backgroundColor: '#007a4b', color: '#fff', },
      '&.microbitimages': { backgroundColor: '#7600a8', color: '#fff', },
      '&.microbitpins': { backgroundColor: '#b22222', color: '#fff', },
      '&.microbitserial': { backgroundColor: '#002050', color: '#fff', },
      '&.microbitcontrol': { backgroundColor: '#333', color: '#fff', },
    },
  },
}));

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const Content = ({course, lesson, language, isReadme}) => {
  const styles = useStyles();

  const isHydrated = useSelector(state => state.hydration);
  const checkboxes = useSelector(state => getCheckboxesForLesson(state, course, lesson, language, isReadme));
  
  useEnhancedEffect(() => {
    renderToggleButtons();
  }, []);

  // NOTE: Should setCheckboxesInDoc really be in an effect?
  //       Wouldn't it be better to change it so that it processes lessonContent before rendering?
  useEnhancedEffect(() => {
    if (isHydrated) {
      const path = getLessonPath(course, lesson, language, isReadme);
      setCheckboxesInDoc(path, checkboxes);
    }
  }, [isHydrated, course, lesson, language, isReadme, checkboxes]);

  useEnhancedEffect(() => {
    if (course === 'microbit' && typeof document !== 'undefined' && isHydrated) {
      renderMicrobit(language);
    }
  }, [course, isHydrated, language]);
  
  let lessonContent = getLessonContent(course, lesson, language, isReadme);
  lessonContent = processContent(lessonContent, styles);
  if (course === 'scratch' && typeof document !== 'undefined' && isHydrated) {
    lessonContent = renderScratchBlocks(lessonContent, styles);
  }
  return <div className={styles.lessonContent} dangerouslySetInnerHTML={{__html: lessonContent}}/>;
};

Content.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default Content;
