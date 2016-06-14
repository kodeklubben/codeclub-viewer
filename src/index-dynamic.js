import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes-dynamic';

export default () => {
  console.log('CLIENT RENDER');
  render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('app')
  );
};
