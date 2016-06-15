require("babel-polyfill");

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PageForDesk from './PageForDesk.js';
require('../../../../../src/client/assets/index.js');
import initStore from '../../src/redux/store.js';

ReactDOM.render(
    <Provider store={initStore()}>
        <PageForDesk />
    </Provider>,
    document.getElementById('content')
);