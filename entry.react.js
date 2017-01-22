import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';

import Index from './index.react.js';
import NoMatch from './no-match.react.js';

import 'tether';
import 'bootstrap';

import 'app.scss';

render(
    <Router
        history={browserHistory}
        render={applyRouterMiddleware(useScroll())}
    >
        <Route path='/' component={Index} />
        <Route path='*' component={NoMatch} />
    </Router>
    , document.getElementById('react')
);
