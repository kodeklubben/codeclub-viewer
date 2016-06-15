'use strict';

import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
<% _.forEach(pages, function( page, index ){ %>import <%= page.pageName %> from './<%= page.pageName %>.js';<%= '\n' %><% });  %>
export default function(){
    const history = useRouterHistory(createHistory)();
    return(
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            <Route path="/" component="div">
                <IndexRoute component={<%= pages[0].pageName %>} />
                <% _.forEach(pages, function( page, index ){ %>
                <Route path="<%= page.model.pagePath%>" component={<%= page.pageName %>} />
                <% });  %>
                <Route path="*" component={<%= pages[0].pageName %>} />
            </Route>
        </Router>
    );
}