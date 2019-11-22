const softHyphen = '\u00ad';

export default {
  general: {
    home: 'Heim',
    level: 'Nivå',
    levels: {
      1: 'Introduksjon',
      2: 'Nybyrjar',
      3: 'Erfaren',
      4: 'Ekspert',
    },
    refresh: 'Siden har vorte oppdatert',
  },
  head: {
    title: 'Kodeklubben',
    description: 'På denne sida finn du oppgåver for barn og unge i alle aldrar som ynskjer å lære programmering. ' +
                  'Alt innhaldet på sida er gratis å bruke, ' +
                  'og blir ofte brukt i kodeklubbar og programmeringsfag i skulen.',
  },
  frontpage: {
    lessoncount: 'Oppgåver: {{count}}',
    continueButton: 'Sist besøkt',
  },
  coursepage: {
    courseinfo: 'Informasjon om  {{title}}',
    courseinfonotfound: 'Oops, her har nokon gløymt å skrive kursinformasjon!',
    instructionbutton: 'Lærarrettleiing',
    nomatchinglessons: 'Ingen oppgåver passar til filteret',
    missingtitle: 'Oppgåvesamling',
    lessonsnottranslated: 'Oppgåvene i denne oppgåvesamlinga har ikkje blitt omsett til nynorsk endå.',
  },
  lessons: {
    writtenby: 'Skrive av:',
    translatedby: 'Omsett av:',
    course: 'Kurs:',
    pdf: 'Last ned PDF',
    print: 'Skriv ut',
    toteacherinstruction: 'Til lærarrettleiing',
    tolesson: 'Til oppgåve',
    reset: 'Fjern avkryssingar',
    tomainlanguage: 'På {{lang}}',
    nottranslated: 'Denne sida finst ikkje på {{lang}}',
    license: 'Lisens: ',
    improvepage: {
      header: 'Gjer denne sida betre',
      textline1: 'Fann du ein feil? Kunne noko vore betre?',
      textline2: 'Viss ja, ver snill og gi oss tilbakemelding ved å lage ein sak på Github ' +
                  'eller fiks feilen sjølv om du kan. Me er takksame for alle tilbakemeldingar!',
      newissuebutton: 'Meld frå om eit problem',
      newissuelink: {
        title: 'Problem med',
        lesson: 'Oppgåve',
        sourcecode: 'Kjeldekoden til oppgåva',
        info: 'Beskriv problemet ditt her. Ta gjerne med operativsystemet ditt, nettlesaren din ' +
              'og eventuell kode du har skrive.',
      },
      showcodebutton: 'Vis koden og fiks det sjølv',
      forumbutton: 'Gå til forumet',
    },
  },
  filter: {
    header: 'Filter',
    radio: {
      playlists: `Oppgåve${softHyphen}samlingar`,
      lessons: 'Alle oppgåver',
    },
    removefilter: 'Nullstill filter',
  },
  navbar: {
    lkknav: {
      aboutlkk: 'Om Lær Kidsa Koding',
      contact: 'Kontakt',
      privacy: 'Personvern i Lær Kidsa Koding og Kodeklubben',
      news: 'Nyhende',
      lessons: 'Oppgåver',
      forum: 'Forum',
      codeclub: 'Kodeklubber',
      school: 'Skule',
      codehour: 'Kodetimen',
      contribute: 'Bidra?',
    },
    menu: 'Meny',
    close: 'Lukke',
    darkmode: 'Nattmodus',
    contribute: 'Lag eigne oppgåver',
    dyslexia: 'Skrift for dyslektikarar',
  },
  404: {
    header: 'Orsak',
    textline: 'Me finn ikkje sida du leitar etter.',
    tofrontpage: 'Til framsida',
  },
};
