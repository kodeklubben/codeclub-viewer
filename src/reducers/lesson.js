/*
  Example state:

  lessons: {
    ...
    ...
    ./python/skilpaddeskolen/skilpaddeskolen.md: {
      title: "Skilpaddeskolen",
      author: "Oversatt fra [Code Club UK](//codeclub.org.uk)",
      level: 2,
      indexed: true,
      external: "",
      readmePath: "",
      course: "python",
      language: "nb",
      tags: {
        tema: {
          0: "animasjon",
          1: "spill",
        }
        language: {
          0: "nb",
        }
      }
      path: "/python/skilpaddeskolen/skilpaddeskolen"
    },
    ...
    ...
    ./scratch/straffespark/straffespark.md: {
      title: "Straffespark",
      author: "Erik Kalstad og Geir Arne Hjelle",
      level: 1,
      indexed: true,
      external: "",
      readmePath: "/scratch/straffespark/README",
      course: "scratch",
      language: "nb",
      tags: {
        tema: {
          0: "spill"
        },
        language: {
          0: "nb"
        }
      },
      path: "/scratch/straffespark/straffespark"
    },
    ...
    ...
  }
 */

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_LESSONS':
      return action.payload.lessons;
  }
  return state;
}
