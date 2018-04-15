const softHyphen = '\u00ad';

export default {
  general: {
    student: 'Elev',
    teacher: 'Lærar',
    level: 'Nivå',
    levels: {
      1: 'Introduksjon',
      2: 'Nybegynnar',
      3: 'Erfaren',
      4: 'Ekspert'
    }
  },
  title: {
    codeclub: 'Kodeklubben',
  },
  frontpage: {
    courses: 'Kurs',
    otherwebsitecourses: 'Kurs på andre nettsider',
    button: {
      start: 'Start her!',
      startlink: '/scratch/astrokatt/astrokatt',
      continue: 'Fortsett...',
    },
    teacherinfobox: {
      header: 'Hei! Du er no i lærarmodus',
      changemode: 'Er du ikkje lærar eller rettleiar? Klikk elev/lærar-knappen i navigasjonsmenyen ' +
                  'for å bytte modus. Du kan få meir informasjon ved å trykke på plussteiknet under',
      teacher: 'Lærar',
      info1: 'Sjekk ut filtera og oppgåverettleiingane våre. På venstre side kan du filtrere på ulike skulefag, ' +
              'for å finne relevante oppgåver til undervisninga di. Når du har huka av for fag så vil du berre ' +
              'sjå dei oppgåvene som våre lærarar har vurdert som relevante, og du kan velje kva språk du ' +
              'vil undervise i. Kvart oppgåvesett har ei rettleiing, og der finn du mellom anna konkrete ' +
              'kompetansemål de kan jobbe med i dei ulike faga.',
      link1: 'Lær meir om programmering i undervisninga',
      assistant: 'Rettleiar',
      info2: 'Oppgåvesetta våre legg opp til at barna jobbar mykje på eiga hand med ulike prosjekt, ' +
              'men me anbefaler å starte kvar øykt med 10-15 minutt intro til kva dei skal gjere og kva ' +
              'som eventuelt er nytt denne gongen. No kan du enkelt filtrere oppgåver på tema, ' +
              'og alle oppgåvesetta har rettleiingar du kan sjekke ut som førebuing til øyktene. ' +
              'For nybegynnarar anbefaler me blokkbasert programmering, der Python, Web eller Processing ' +
              'er dei vanlegaste å gå vidare med etterpå.',
      link2: 'Lær meir om å drive ein kodeklubb'
    },
    showhidefilter: 'Vis/skjul filter'
  },
  playlist: {
    lessons: 'Oppgåver',
    courseinfo: 'Informasjon om kurset',
    courseinfonotfound: 'Oops, her har nokon gløymt å skrive kursinformasjon!',
    instructionbutton: 'Lærarrettleiing',
    levelnavigation: 'Hopp til',
    lessoncollections: 'Oppgåvesamlinger',
    nomatchinglessons: 'Ingen oppgåver passar til filteret'
  },
  lessons: {
    writtenby: 'Skrevet av:',
    translatedby: 'Oversatt av:',
    course: 'Kurs:',
    pdf: 'Last ned PDF',
    print: 'Skriv ut',
    toteacherinstruction: 'Til lærarrettleiing',
    tolesson: 'Til oppgåve',
    reset: 'Fjern avkrysninger',
    tomainlanguage: 'På {{lang}}',
    improvepage: {
      header: 'Gjer denne sida betre',
      textline1: 'Fann du ein feil? Kunne noko vore betre?',
      textline2: 'Viss ja, ver snill og gi oss tilbakemelding ved å lage ein sak på Github ' +
                  'eller fiks feilen sjølv om du kan. Me er takksame for alle tilbakemeldingar!',
      newissuebutton: 'Meld frå om eit problem',
      newissuelink: {
        title: 'Problem med',
        lesson: 'Oppgåve',
        sourcecode: 'Kjeldekoda til oppgåva',
        info: 'Beskriv problemet ditt her. Ta gjerne med operativsystemet ditt, nettlesaren din ' +
              'og eventuell kode du har skrive.'
      },
      showcodebutton: 'Vis koden og fiks det sjølv',
      forumbutton: 'Gå til forumet'
    }
  },
  filter: {
    header: 'Filter',
    tooltip: 'I filteret kan du sortere ut dei oppgåvene du vil løyse etter kva tema du vil jobbe med.',
    radio: {
      playlists: `Oppgave${softHyphen}samlinger`,
      lessons: 'Alle oppgaver'
    },
    removefilter: 'Nullstill filter'
  },
  navbar: {
    mode: 'Modus',
    lkknav: {
      aboutlkk: 'Om LKK',
      news: 'Nyhende',
      lessons: 'Oppgåver',
      findcodeclub: 'Finn kodeklubb',
      codeclub: 'Kodeklubben',
      school: 'Skule',
      codehour: 'Kodetimen',
      contribute: 'Bidra?'
    },
    menu: 'Meny'
  },
  search: {
    placeholder: 'Søk'
  },
  footer: {
    contribute: 'Bidra?'
  },
  404: {
    header: 'Noko gjekk gale',
    textline1: 'Me finn ikkje sida du leitar etter.',
    tofrontpage: 'Til framsida'
  }
};
