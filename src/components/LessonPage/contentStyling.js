import {makeStyles} from '@material-ui/core/styles';

const styledList = {
  '& ul, & ol': {
    padding: 0,
    margin: '0 0 20px',
  },
  '& li.task-list-item::before': {
    content: '""',
    opacity: 0,
  },
  '& li': {
    listStyle: 'none',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 45,
    '&::before': {
      content: '""',
      borderRadius: 20,
      border: '3px solid #abdbea',
      padding: 8,
      float: 'left',
      marginLeft: -40,
      marginTop: 2,
    },
    '& label': {
      fontWeight: 'normal',
      marginLeft: 6,
    },
  },
};

const headingStyle = {
  color: '#fff',
  background: '#349946',
  padding: 10,
  borderRadius: 5
};

export const useStyles = makeStyles(theme => ({
  lessonContent: {
    '& figure': {
      '& img': {
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        padding: 20,
      },
    },
    '& a': {
      color: theme.palette.primary.main,
    },
    '& .check, & .activity, & .save': {
      extend: styledList,
    },
    '& pre.blocks, & code.b': {
      backgroundColor: 'inherit',
      border: 0,
    },
    '& pre': {
      '& code': {
        backgroundColor: 'transparent',
        wordWrap: 'normal',
        whiteSpace: 'pre',
      },
    },
    '& section.activity': {
      '& h1': {
        extend: headingStyle,
      },
      '&.subsection': {
        '& h2': {
          extend: [styledList, headingStyle],
          fontWeight: 300,
        }
      }
    },
    '& section.check': {
      '& h2': {
        paddingTop: 4,
        paddingBottom: 9,
        display: 'flex',
        alignItems: 'center',
        '& img': {
          height: 40,
          paddingRight: 10,
        },
      },
    },
    '& section.try': {
      background: '#abdbea',
      borderRadius: 10,
      padding: '1px 20px 10px',
      '& code': {
        backgroundColor: '#fff',
        color: '#007cc9',
      },
      '& li::before': {
        border: '3px solid #fff',
      },
    },
    '& section.protip, & section.tip': {
      border: '3px solid #ff7f00',
      background: '#fff99d',
      borderRadius: 12,
      padding: '0 20px 20px',
      marginTop: 20,
      marginBottom: 20,
    },
    '& section.flag': {
      borderTop: '3px dotted rgb(230, 134, 45)',
      paddingBottom: 20,
      marginTop: 20,
      marginBottom: 20,
      '& h2': {
        color: 'rgb(54, 161, 55)',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 15,
        paddingBottom: 10,
        display: 'flex',
        alignItems: 'center',
        '& img': {
          height: 40,
          paddingRight: 10,
        },
      },
    },
    '& section.save': {
      borderTop: '3px solid rgb(36, 90, 154)',
      margin: '20px, 0',
      '& h2': {
        color: 'rgb(36, 90, 154)',
        margin: 0,
        paddingTop: 10,
        paddingBottom: 20,
        display: 'flex',
        alignItems: 'center',
        '& img': {
          height: 40,
          paddingRight: 10,
        },
      },
    },
    '& section.challenge': {
      border: '3px solid #00b1da',
      borderRadius: 12,
      paddingBottom: 10,
      marginTop: 20,
      marginBottom: 20,
      '& h2': {
        color: '#fff',
        background: '#00b1da',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 0,
        '@media print': {
          borderBottom: '2px solid #00b1da',
        },
      },
      '& *': {
        padding: '0 20px',
      },
    },
    '& .blockmotion': { backgroundColor: '#4c97ff', color: '#fff', },
    '& .blocklooks': { backgroundColor: '#96f', color: '#fff', },
    '& .blocksound': { backgroundColor: '#cf63cf', color: '#fff', },
    '& .blockpen': { backgroundColor: '#0fbd8c', color: '#fff', },
    '& .blockdata': { backgroundColor: '#ff8c1a', color: '#fff', },
    '& .blockevents': { backgroundColor: '#ffbf00', color: '#fff', },
    '& .blockcontrol': { backgroundColor: '#ffab19', color: '#fff', },
    '& .blocksensing': { backgroundColor: '#5cb1d6', color: '#fff', },
    '& .blockoperators': { backgroundColor: '#59c059', color: '#fff', },
    '& .blockmoreblocks': { backgroundColor: '#ff6680', color: '#fff', },
    '& .microbitbasic': { backgroundColor: '#1e90ff', color: '#fff', },
    '& .microbitinput': { backgroundColor: '#d400d4', color: '#fff', },
    '& .microbitmusic': { backgroundColor: '#e63022', color: '#fff', },
    '& .microbitled': { backgroundColor: '#5c2d91', color: '#fff', },
    '& .microbitradio': { backgroundColor: '#e3008c', color: '#fff', },
    '& .microbitloops': { backgroundColor: '#0a0', color: '#fff', },
    '& .microbitlogic': { backgroundColor: '#00a4a6', color: '#fff', },
    '& .microbitvariables': { backgroundColor: '#dc143c', color: '#fff', },
    '& .microbitmath': { backgroundColor: '#9400d3', color: '#fff', },
    '& .microbitfunctions': { backgroundColor: '#3455db', color: '#fff', },
    '& .microbitarrays': { backgroundColor: '#e65722', color: '#fff', },
    '& .microbittext': { backgroundColor: '#b8860b', color: '#fff', },
    '& .microbitgame': { backgroundColor: '#007a4b', color: '#fff', },
    '& .microbitimages': { backgroundColor: '#7600a8', color: '#fff', },
    '& .microbitpins': { backgroundColor: '#b22222', color: '#fff', },
    '& .microbitserial': { backgroundColor: '#002050', color: '#fff', },
    '& .microbitcontrol': { backgroundColor: '#333', color: '#fff', },
    '& table': {
      width: '100%',
      maxWidth: '100%',
      marginBottom: 20,
      '& thead, & tbody, & tfoot': {
        '& tr': {
          '& th, & td': {
            padding: 8,
            lineHeight: '1.4px',
            verticalAlign: 'top',
            borderTop: '1px solid #ddd',
          },
        },
      },
      '& thead': {
        '& tr': {
          '& th': {
            varticalAlign: 'bottom',
            borderBottom: '2px solid #ddd',
          },
        },
      },
      '& caption + & thead, & colgroup + & thead, & thead:first-child': {
        '& tr:first-child': {
          '& th, & td': {
            borderTop: 0,
          },
        },
      },
      '& tbody + & tbody': {
        borderTop: '2px solid #ddd',
      },
      '& .table': {
        backgroundColor: '#fff',
      },
    },
    '& .video-container': {
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      overflow: 'hidden',
      margin: '30px 0 60px',
      '& iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
    '& input[type=checkbox]': {
      position: 'absolute',
      opacity: 0,
    },
    '& input[type=checkbox] + & label': {
      position: 'relative',
      fontWeight: 'normal',
      marginLeft: 0,
    },
    '& input[type=checkbox] + & label::before': {
      content: 'a0',
      display: 'inline-block',
      visibility: 'visible',
      width: '1.3em',
      height: '1.3em',
      margin: '0 0.6em 0 -2.2em',
      lineHeight: '1.1em',
      border: '3px solid #abdbea',
      borderRadius: 3,
    },
    '& input[type=checkbox]:checked + & label::before': {
      content: '2714',
      lineHeight: '1.1em',
      paddingLeft: '0.1em',
    },
    '& input[type=checkbox]:active + & label::before, & input[type=checkbox]:focus + & label::before': {
      background: 'darken(#abdbea, 20%)',
    },
  },
}));
