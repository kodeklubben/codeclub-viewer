import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer.js';
import mainSaga from './saga.js';
import myMiddleware from './middleware.js';

const sagaMiddleware = createSagaMiddleware();

export default function(){
    const store = createStore(reducer, applyMiddleware(myMiddleware, sagaMiddleware, thunk));
    sagaMiddleware.run(mainSaga);
    return store;
}
