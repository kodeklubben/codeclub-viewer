import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Grid, Typography, Link} from '@material-ui/core';
import LevelIcon from '../components/LevelIcon';
import {getTranslator} from '../selectors/translate';
import {setLastLesson} from '../reducers/lastLesson';
import Content from '../components/LessonPage/Content';
import {getLessonTitle, getLessonAuthor, getLessonTranslator, getLessonPath} from '../resources/lessonFrontmatter';
import {getLessonIntroText} from '../resources/lessonContent';
import {getLevel, getLicense} from '../resources/lessons';
import ButtonRow from '../components/LessonPage/ButtonRow';
import Head from '../components/Head';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ImprovePage from '../components/LessonPage/ImprovePage';
import PrintInfo from '../components/LessonPage/PrintInfo';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const LessonPage = ({course, lesson, language, isReadme}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  const dispatch = useDispatch();
  useEffect(() => {
    const path = getLessonPath(course, lesson, language, isReadme);
    dispatch(setLastLesson(path));
  }, [course, lesson, language, isReadme, dispatch]);

  const title = getLessonTitle(course, lesson, language, isReadme);

  const author = getLessonAuthor(course, lesson, language, isReadme);
  const authorNode = author ?
    <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={author} inline={true}/></i></p> : null;

  const translator = getLessonTranslator(course, lesson, language, isReadme);
  const translatorNode = translator ? <p><i>{t('lessons.translatedby')} {translator}</i></p> : null;

  const license = getLicense(course, lesson);
  const licenseRow = <Grid container spacing={1}>
    <Grid item>
      {t('lessons.license')}
    </Grid>
    <Grid item>
      {license ?
        <MarkdownRenderer src={license} inline={true}/> :
        <Link
          color='inherit'
          href='http://creativecommons.org/licenses/by-sa/4.0/deed'
          target='_blank'
          rel='noopener'
        >
          CC BY-SA 4.0
        </Link>
      }
    </Grid>
  </Grid>;

  return (
    <Container className={classes.container} maxWidth='md'>
      <Head {...{title}} description={getLessonIntroText(course, lesson, language, isReadme)}/>
      <Grid container spacing={2} wrap='nowrap' alignItems='center'>
        <Grid item>
          <LevelIcon fontSize='large' level={getLevel(course, lesson)}/>
        </Grid>
        <Grid item>
          <Typography variant='h3' component='h1'>{title}</Typography>
        </Grid>
      </Grid>
      {authorNode}
      {translatorNode}
      <PrintInfo {...{course, lesson}}/>
      <ButtonRow {...{course, lesson, language, isReadme}}/>
      <Content {...{course, lesson, language, isReadme}}/>
      {licenseRow}
      <Grid container justify='center'>
        <ImprovePage {...{course, lesson, language, isReadme}}/>
      </Grid>
    </Container>
  );
};

LessonPage.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default LessonPage;
