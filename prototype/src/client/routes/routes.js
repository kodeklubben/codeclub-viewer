'use strict';

import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import HomePage from './HomePage.js';

export default function() {
    const history = useRouterHistory(createHistory)();
    return (
        <Router onUpdate={ () => window.scrollTo(0, 0) } history={ history }>
            <Route path="/" component="div">
                <IndexRoute component={ HomePage } />
                <Route path="/home" component={ HomePage } />
                <Route path="*" component={ HomePage } />
            </Route>
        </Router>
        );
}