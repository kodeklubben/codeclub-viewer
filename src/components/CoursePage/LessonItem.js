import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import StarIcon from '@material-ui/icons/Star';
import {getLessonTitle, getLessonPath, getLessonExternal} from '../../resources/lessonFrontmatter';
import {getLevel} from '../../resources/lessons';
import {getLessonIntro} from '../../resources/lessonContent';
import {onlyCheckedMainLanguage} from '../../selectors/filter';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../selectors/checkboxes';
import PopoverComponent from '../PopoverComponent';
import Flag from '../Flag';

const LessonItem = ({course, lesson, language}) => {
  const isOnlyCheckedMainLanguage = useSelector(state => onlyCheckedMainLanguage(state));
  const checkedCheckboxes = useSelector(state => getNumberOfCheckedCheckboxes(state, course, lesson, language, false));
  const totalCheckboxes = useSelector(state => getTotalNumberOfCheckboxes(state, course, lesson, language, false));

  const title = getLessonTitle(course, lesson, language, false);
  const external = getLessonExternal(course, lesson, language, false);
  const popoverContent = getLessonIntro(course, lesson, language, false);
  const level = getLevel(course, lesson);
  const progress = checkedCheckboxes && level > 0 ? `(${checkedCheckboxes}/${totalCheckboxes})` : null;
  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;

  return external ?
    <ListItem component={RouterLink} target='_blank' rel='noopener' href={external} button>
      {isOnlyCheckedMainLanguage ? null :
        <ListItemIcon>
          <Flag {...{language}}/>
        </ListItemIcon>
      }
      <ListItemText primary={title}/>
      <ListItemIcon>
        <LinkIcon color='primary'/>
      </ListItemIcon>
      <ListItemSecondaryAction>
        <PopoverComponent {...{popoverContent}}/>
      </ListItemSecondaryAction>
    </ListItem>
    :
    <React.Fragment>
      <ListItem component={RouterLink} to={getLessonPath(course, lesson, language, false)} button> 
        {isOnlyCheckedMainLanguage ? null :
          <ListItemIcon>  
            <Flag {...{language}}/>
          </ListItemIcon>
        }
        <ListItemText primary={title} secondary={progress}/>
        {progressPercent === 100 ? <ListItemIcon><StarIcon color='primary'/></ListItemIcon> : null}
        <ListItemSecondaryAction>
          <PopoverComponent {...{popoverContent}}/>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>;
};

LessonItem.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default LessonItem;
