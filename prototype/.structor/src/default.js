import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, Route, Link, useRouterHistory } from 'react-router';
import PageForDesk from './PageForDesk.js';

require('../../src/client/assets/index.js');
import initStore from '../../src/client/redux/store.js';

window.__createPageDesk = function(){

    const history = useRouterHistory(createHistory)({
        basename: '/structor-deskpage'
    });

    window.__switchToPath = function(pagePath){
        history.push(pagePath);
    };

    let childRoutes = [];
    if(window.__pages && window.__pages.length > 0){
        childRoutes = window.__pages.map( (page, idex) => {
            return { path: page.pagePath, component: PageForDesk }
        });
        childRoutes.push({ path: '*', component: PageForDesk });
    } else {
        console.warn('Please check project model, pages were not found.');
    }

    let routeConfig = [
        { path: '/',
            component: 'div',
            indexRoute: { component: PageForDesk },
            childRoutes: childRoutes
        }
    ];

    ReactDOM.render(
        <Provider store={initStore()}>
            <Router history={history} routes={routeConfig} />
        </Provider>,
        document.getElementById('content')
    );

    window.pageReadyState = 'initialized';

};

window.pageReadyState = 'ready';
