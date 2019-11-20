import React from 'react';
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
  link: {
    marginTop: theme.spacing(2),
    '& a': {
      color: theme.palette.primary.main,
    },
  },
}));

const LessonPage = ({course, lesson, language, isReadme}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  const dispatch = useDispatch();
  React.useEffect(() => {
    const path = getLessonPath(course, lesson, language, isReadme);
    dispatch(setLastLesson(path));
  }, [course, lesson, language, isReadme, dispatch]);

  const title = getLessonTitle(course, lesson, language, isReadme);

  const author = getLessonAuthor(course, lesson, language, isReadme);
  const authorNode = author ?
    <Typography className={classes.link}>
      {t('lessons.writtenby')} <MarkdownRenderer src={author} inline={true}/>
    </Typography> : null;

  const translator = getLessonTranslator(course, lesson, language, isReadme);
  const translatorNode = translator ? 
    <Typography className={classes.link}>{t('lessons.translatedby')} {translator}</Typography> : null;

  const license = getLicense(course, lesson);
  const licenseRow = <Typography className={classes.link}>{t('lessons.license')} {license ?
    <MarkdownRenderer src={license} inline={true}/>
    :
    <Link
      color='inherit'
      href='http://creativecommons.org/licenses/by-sa/4.0/deed'
      target='_blank'
      rel='noopener'
    >
      CC BY-SA 4.0
    </Link>}
  </Typography>;

  return (
    <Container role='main' className={classes.container} maxWidth='md'>
      <Head {...{title}} description={getLessonIntroText(course, lesson, language, isReadme)}/>
      <Grid container alignItems='center' wrap='nowrap'>
        <LevelIcon fontSize='large' level={getLevel(course, lesson)}/>
        <Typography variant='h3' component='h1'>{title}</Typography>
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
