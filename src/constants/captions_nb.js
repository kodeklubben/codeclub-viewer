const softHyphen = '\u00ad';

export default {
  general: {
    home: 'Hjem',
    student: 'Elev',
    teacher: 'Lærer',
    level: 'Nivå',
    levels: {
      1: 'Introduksjon',
      2: 'Nybegynner',
      3: 'Erfaren',
      4: 'Ekspert',
    },
    picture: 'Bilde av {{title}}',
    glyphicon: 'Info for {{title}}',
  },
  head: {
    title: 'Kodeklubben',
    description: 'På denne siden finner du oppgaver for barn og unge i alle aldre som ønsker å lære programmering. ' +
                  'Alt innholdet på siden er gratis å bruke, ' +
                  'og er ofte benyttet på kodeklubben og programmeringsfag i skolen.',
  },
  frontpage: {
    courses: 'Kurs',
    lessoncount: 'Oppgaver: {{count}}',
    otherwebsitecourses: 'Kurs på andre nettsider',
    continueButton: 'Sist besøkt',
    teacherinfobox: {
      header: 'Hei! Du er nå i lærermodus',
      changemode: 'Er du ikke er en lærer eller veileder? Klikk elev / lærer-knappen i navigasjonsmenyen ' +
                  'for å bytte modus. Du kan få mer informasjon ved å trykke på plusstegnet under',
      teacher: 'Lærer',
      info1: 'Sjekk ut våre filtre og oppgaveveiledninger. På venstre side kan du filtrere på ulike skole-fag, ' +
              'for å finne relevante oppgaver til din undervisning. Når du har huket av for fag så vil du kun ' +
              'se kun de oppgavene som våre lærere har vurdert som relevante, og du kan velge hvilket språk du ' +
              'vil undervise i. Hvert oppgavesett har en veiledning, og der finner du bl.a. hvilke konkrete ' +
              'læreplanmål man kan jobbe med i de ulike fagene.',
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
