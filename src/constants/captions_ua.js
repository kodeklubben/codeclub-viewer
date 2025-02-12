const softHyphen = '\u00ad';

export default {
  general: {
    home: 'Головна',
    student: 'Учень',
    teacher: 'Вчитель',
    level: 'Рівень',
    levels: {
      1: 'Вступ',
      2: 'Початківець',
      3: 'Досвідчений',
      4: 'Експерт',
    },
    picture: 'Зображення {{title}}',
    glyphicon: 'Інформація про {{title}}',
  },
  head: {
    title: 'Клуб програмування',
    description: 'На цій сторінці ви знайдете завдання для дітей та підлітків будь-якого віку, які бажають навчитися програмуванню. ' +
                  'Увесь вміст на сайті безкоштовний для використання, ' +
                  'і часто використовується в клубах програмування та на уроках програмування в школах.',
  },
  frontpage: {
    courses: 'Курси',
    lessoncount: 'Завдань: {{count}}',
    otherwebsitecourses: 'Курси на інших сайтах',
    continueButton: 'Останній відвідуваний',
    teacherinfobox: {
      header: 'Привіт! Ви зараз у режимі вчителя',
      changemode: 'Ви не вчитель або інструктор? Натисніть кнопку учень/вчитель у навігаційному меню, ' +
                  'щоб змінити режим. Ви можете отримати більше інформації, натиснувши на значок плюс нижче',
      teacher: 'Вчитель',
      info1: 'Перегляньте наші фільтри та настанови щодо завдань. Ліворуч можна фільтрувати завдання за різними шкільними предметами, ' +
              'щоб знайти відповідні завдання для вашого навчання. Коли ви виберете предмети, ' +
              'ви побачите тільки ті завдання, які наші вчителі оцінили як відповідні. Ви можете обрати мову, ' +
              'якою будете викладати. Кожен набір завдань має настанову, у якій, зокрема, зазначені конкретні ' +
              'навчальні цілі, над якими можна працювати в різних предметах.',
      link1: 'Lær mer om programmering i undervisningen',
      assistant: 'Veileder',
      info2: 'Våre oppgavesett legger opp til at barna jobber mye på egenhånd med ulike prosjekter, ' +
              'men vi anbefaler å starte hver økt med 10-15 min intro til hva man skal gjøre og hva ' +
              'som eventuelt er nytt denne gangen. Nå kan du enkelt filtrere oppgaver på temaer, ' +
              'og alle oppgavesett har veiledninger du kan sjekke ut som forberedelse til øktene. ' +
              'For nybegynnere så anbefaler vi blokkbasert programmering, hvor Python / Web / Processing ' +
              'er de vanligste å gå videre med etterpå.',
      link2: 'Lær mer om å drive en kodeklubb',
      plus: 'Vis mer informasjon',
      minus: 'Vis mindre informasjon',
    },
    showhidefilter: 'Vis/skjul filter',
  },
  coursepage: {
    courseinfo: 'Informasjon om kurset',
    courseinfonotfound: 'Oops, her har noen glemt å skrive kursinformasjon!',
    levelnavigation: 'Hopp til',
    lessoncollections: 'Oppgavesamlinger',
    nomatchinglessons: 'Ingen oppgaver passer til filteret',
    missingtitle: 'Oppgavesamling',
    lessonsnottranslated: 'Oppgavene i denne oppgavesamlingen har ikke blitt oversatt til bokmål ennå.',
  },
  lessons: {
    writtenby: 'Skrevet av:',
    translatedby: 'Oversatt av:',
    course: 'Kurs:',
    pdf: 'Last ned PDF',
    pdfstyling: 'Velg Lagre som PDF. Så kan man velge ' +
      'Flere innstillinger og huke av Bakgrunnsgrafikk for å få med flere farger',
    print: 'Skriv ut',
    toteacherinstruction: 'Til lærerveiledning',
    tolesson: 'Til oppgave',
    reset: 'Fjern avkrysninger',
    tomainlanguage: 'På {{lang}}',
    nottranslated: 'Denne siden finnes ikke på {{lang}}',
    license: 'Lisens: ',
    improvepage: {
      header: 'Forbedre denne siden',
      textline1: 'Funnet en feil? Kunne noe vært bedre?',
      textline2: 'Hvis ja, vennligst gi oss tilbakemelding ved å lage en sak på Github ' +
                  'eller fiks feilen selv om du kan. Vi er takknemlige for enhver tilbakemelding!',
      newissuebutton: 'Rapporter et problem',
      newissuelink: {
        title: 'Problem med',
        lesson: 'Oppgave',
        sourcecode: 'Oppgavens kildekode',
        info: 'Beskriv ditt problem her. Ta gjerne med operativsystem, nettleser og eventuell kode du har skrevet.'
      },
      showcodebutton: 'Vis koden og fiks selv',
      forumbutton: 'Gå til forumet',
    },
  },
  filter: {
    header: 'Filter',
    tooltip: 'Dersom man velger "Alle oppgaver", ' +
      'så kan man i filteret sortere ut de oppgavene man vil løse etter hvilke tema man vil jobbe med.',
    radio: {
      playlists: `Oppgave${softHyphen}samlinger`,
      lessons: 'Alle oppgaver',
      group: 'Gruppe med to valg',
    },
    removefilter: 'Nullstill filter',
  },
  navbar: {
    mode: 'Modus',
    lkknav: {
      aboutlkk: 'Om LKK',
      news: 'Nyheter',
      lessons: 'Oppgaver',
      findcodeclub: 'Finn kodeklubb',
      codeclub: 'Kodeklubben',
      school: 'Skole',
      codehour: 'Kodetimen',
      contribute: 'Bidra?',
    },
    menu: 'Meny',
  },
  search: {
    placeholder: 'Søk',
  },
  footer: {
    contribute: 'Lag egne oppgaver',
    dyslexia: 'Skrift for dyslektikere',
  },
  404: {
    header: 'Beklager',
    textline: 'Vi finner ikke siden du leter etter.',
    tofrontpage: 'Til forsiden',
  },
};
