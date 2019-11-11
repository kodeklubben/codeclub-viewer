import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Button} from '@material-ui/core';
import {getTranslator} from '../../selectors/translate';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import ClearIcon from '@material-ui/icons/Clear';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    '@media print': {
      display: 'none',
    },
  },
}));

const ResetButton = ({path}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  return (
    <Button
      color='primary'
      variant='outlined'
      className={classes.buttonMargin}
      onClick={() => setCheckboxesInDoc(path, {})}
      startIcon={<ClearIcon color='primary'/>}
    >
      {t('lessons.reset')}
    </Button>
  );
};

ResetButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ResetButton;
