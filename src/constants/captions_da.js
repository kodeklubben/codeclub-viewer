export default {
  general: {
    student: 'Elev',
    teacher: 'Lærer',
    level: 'Nivå',
    levels: {
      1: 'Introduksjon',
      2: 'Nybegynner',
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
    welcomebox: {
      header: 'Hei! Du er nå i elevmodus',
      changemode: 'Er du ikke en elev? Klikk elev / lærer-knappen i navigasjonsmenyen for å bytte modus. ' +
                  'Du kan også velge å skjule denne boksen for alltid, ved å trykke på X i hjørnet',
      info: 'Velkommen til Kodeklubbens oppgavesider! Her finner du mange veiledninger som du kan ' +
            'bruke som inspirasjon for å lære deg programmering og lage dine egne spill, apper og nettsider. ' +
            'For nybegynnere anbefaler vi å ta en titt på de blokkbaserte oppgavene i Code Studio eller Scratch. ' +
            'Bruk gjerne filtrene på venstre side til å finne oppgaver som passer for deg!',
      startbutton: 'Start her!',
      buttonlink: '/scratch/astrokatt/astrokatt',
      continuebutton: 'Fortsett...',
    },
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
      link2: 'Lær mer om å drive en kodeklubb'
    },
    showhidefilter: 'Vis/skjul filter'
  },
  playlist: {
    lessons: 'Oppgaver',
    courseinfo: 'Informasjon om kurset',
    courseinfonotfound: 'Oops, her har noen glemt å skrive kursinformasjon!',
    instructionbutton: 'Lærerveiledning',
    levelnavigation: 'Hopp til',
    lessoncollections: 'Oppgavesamlinger',
    nomatchinglessons: 'Ingen oppgaver passer til filteret'
  },
  lessons: {
    writtenby: 'av',
    toteacherinstruction: 'Til lærerveiledning',
    tolesson: 'Til oppgave',
    reset: 'Fjern avkrysninger',
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
      forumbutton: 'Gå til forumet'
    }
  },
  filter: {
    group: {
      grade: 'Klassetrinn',
      language: 'Språk',
      subject: 'Fag',
      topic: 'Tema',
    },
    tags_grade: {
      preschool: 'Barnehage',
      primary: '1.-4. klasse',
      secondary: '5.-7. klasse',
      junior: '8.-10. klasse',
      senior: 'Videregående skole'
    },
    tags_language: {
      nb: 'Norsk bokmål',
      nn: 'Norsk nynorsk',
      sv: 'Svenska',
      da: 'Dansk',
      en: 'English',
      hr: 'Hrvatski',
    },
    tags_subject: {
      mathematics: 'Matematikk',
      science: 'Naturfag',
      programming: 'Programmering',
      technology: 'Teknologi',
      music: 'Musikk',
      norwegian: 'Norsk',
      english: 'Engelsk',
      arts_and_crafts: 'Kunst og håndverk',
      social_science: 'Samfunnsfag',
    },
    tags_topic: {
      app: 'App',
      electronics: 'Elektronikk',
      step_based: 'Stegbasert',
      block_based: 'Blokkbasert',
      text_based: 'Tekstbasert',
      minecraft: 'Minecraft',
      web: 'Nettside',
      game: 'Spill',
      robot: 'Robot',
      animation: 'Animasjon',
    },
    header: 'Filter',
    tooltip: {
      textline1: 'I filteret kan man sortere ut de oppgavene man vil løse etter hvilke tema man vil jobbe med.',
      textline2: 'Bak hvert valg står det antall oppgaver som kan løses, etter hvilke valg du gjør i filteret.'
    },
    removefilter: 'Fjern filter'
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
      contribute: 'Bidra?'
    },
    menu: 'Meny'
  },
  search: {
    placeholder: 'Søk'
  },
  footer: {
    downloadZIP:  'Last ned alle kurs som zip-fil'
  },
  404: {
    header: 'Noe gikk galt',
    textline1: 'Vi finner ikke siden du leter etter.',
    tofrontpage: 'Til forsiden'
  }
};
