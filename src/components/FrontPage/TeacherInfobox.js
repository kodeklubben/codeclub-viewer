import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './TeacherInfobox.scss';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';

const TeacherInfobox = () => {
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  useStyles(styles);

  const {t} = useSelector(state => ({
    t: getTranslator(state),
  }));

  const url = [
    'http://kidsakoder.no/skole/valgfag/',
    'http://kidsakoder.no/kodeklubben/'
  ];
  const ariaLabel = showCourseInfo ? t('frontpage.teacherinfobox.minus') : t('frontpage.teacherinfobox.plus');
  return (
    <div className={styles.center}>
      <div className={styles.infoBox}>
        <h1 className={styles.center}>{t('frontpage.teacherinfobox.header')}</h1>
        <br />
        {t('frontpage.teacherinfobox.changemode')}
        <br />
        <div className={styles.center}>
          <Button
            className={styles.plusSign}
            onClick={() => setShowCourseInfo(!showCourseInfo)}
            aria-label={ariaLabel}
          >
            <Glyphicon glyph={!showCourseInfo ? 'plus-sign' : 'minus-sign'}/>
          </Button>
        </div>
        <Collapse in={showCourseInfo}>
          <div>
            <h2 className={styles.headers}>{t('frontpage.teacherinfobox.teacher')}</h2>
            {t('frontpage.teacherinfobox.info1')}
            <br />
            <a className={styles.link} href={url[0]} target='_blank' rel='noopener'>
              {t('frontpage.teacherinfobox.link1')}
            </a>
            <br />
            <h2 className={styles.headers}>{t('frontpage.teacherinfobox.assistant')}</h2>
            {t('frontpage.teacherinfobox.info2')}
            <br />
            <a className={styles.link} href={url[1]} target='_blank' rel='noopener'>
              {t('frontpage.teacherinfobox.link2')}
            </a>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default TeacherInfobox;
