const softHyphen = '\u00ad';

export default {
  general: {
    home: 'Hjem',
    level: 'Nivå',
    levels: {
      1: 'Introduksjon',
      2: 'Nybegynner',
      3: 'Erfaren',
      4: 'Ekspert',
    },
    refresh: 'Siden har blitt oppdatert',
  },
  head: {
    title: 'Kodeklubben',
    description: 'På denne siden finner du oppgaver for barn og unge i alle aldre som ønsker å lære programmering. ' +
                  'Alt innholdet på siden er gratis å bruke, ' +
                  'og er ofte benyttet på kodeklubben og programmeringsfag i skolen.',
  },
  frontpage: {
    lessoncount: 'Oppgaver: {{count}}',
    continueButton: 'Sist besøkt',
  },
  coursepage: {
    courseinfo: 'Informasjon om {{title}}',
    courseinfonotfound: 'Oops, her har noen glemt å skrive kursinformasjon!',
    nomatchinglessons: 'Ingen oppgaver passer til filteret',
    missingtitle: 'Oppgavesamling',
    lessonsnottranslated: 'Oppgavene i denne oppgavesamlingen har ikke blitt oversatt til bokmål ennå.',
  },
  lessons: {
    writtenby: 'Skrevet av:',
    translatedby: 'Oversatt av:',
    course: 'Kurs:',
    pdf: 'Last ned PDF',
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
    radio: {
      playlists: `Oppgave${softHyphen}samlinger`,
      lessons: 'Alle oppgaver',
    },
    removefilter: 'Nullstill filter',
  },
  navbar: {
    lkknav: {
      aboutlkk: 'Om Lær Kidsa Koding',
      contact: 'Kontakt',
      privacy: 'Personvern i Lær Kidsa Koding og Kodeklubben',
      news: 'Nyheter',
      lessons: 'Oppgaver',
      forum: 'Forum',
      codeclub: 'Kodeklubber',
      school: 'Skole',
      codehour: 'Kodetimen',
      contribute: 'Bidra?',
    },
    menu: 'Meny',
    close: 'Lukke',
    darkmode: 'Nattmodus',
    contribute: 'Lag egne oppgaver',
    dyslexia: 'Skrift for dyslektikere',
  },
  404: {
    header: 'Beklager',
    textline: 'Vi finner ikke siden du leter etter.',
    tofrontpage: 'Til forsiden',
  },
};
