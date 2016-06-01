import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer.js';
import mainSaga from './saga.js';
import myMiddleware from './middleware.js';
import initialState from './initialState.js';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
    myMiddleware,
    sagaMiddleware,
    thunk
)(createStore);

export default function(){
    const store = createStoreWithMiddleware(reducer, initialState);
    sagaMiddleware.run(mainSaga);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducer.js', () => {
            const nextRootReducer = require('./reducer.js');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
