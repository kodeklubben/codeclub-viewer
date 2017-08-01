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
    welcomebox: {
      header: 'Hei! Du er no i elevmodus',
      changemode: 'Er du ikkje elev? Klikk elev/lærar-knappen i navigasjonsmenyen for å bytte modus. ' +
                  'Du kan også velje å skjule denne boksen for alltid, ved å trykkje på X i hjørnet',
      info: 'Velkomen til Kodeklubben sine oppgåvesider! Her finn du mange rettleiingar som du kan ' +
            'bruke som inspirasjon for å lære deg programmering og lage dine eigne spel, appar og nettsider. ' +
            'For nybegynnarar anbefaler me å ta ein kikk på dei blokkbaserte oppgåvene i Code Studio eller Scratch. ' +
            'Bruk gjerne filtera på venstre side til å finne oppgåver som passar for deg!',
      startbutton: 'Start her!',
      buttonlink: '/scratch/astrokatt/astrokatt',
      continuebutton: 'Fortsett...',
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
    writtenby: 'av',
    toteacherinstruction: 'Til lærarrettleiing',
    tolesson: 'Til oppgåve',
    reset: 'Fjern avkrysninger',
    tomainlanguage: 'På ditt språk',
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
      senior: 'Videregående skole',
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
      textline1: 'I filteret kan du sortere ut dei oppgåvene du vil løyse etter kva tema du vil jobbe med.',
      textline2: 'Bak kvart val står det kor mange oppgaver som passar til filteret du legg på.'
    },
    removefilter: 'Fjern filter'
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
    downloadZIP:  'Last ned alle kursa som zip-fil'
  },
  404: {
    header: 'Noko gjekk gale',
    textline1: 'Me finn ikkje sida du leitar etter.',
    tofrontpage: 'Til framsida'
  }
};
