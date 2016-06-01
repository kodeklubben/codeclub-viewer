require('./assets/index.js');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getRoutes from './routes/routes.js';
import getStore from './redux/store.js';

ReactDOM.render(
    <Provider store={getStore()}>
        {getRoutes()}
    </Provider>,
    document.getElementById('content')
);
