import {Provider} from 'react-redux';
import React from 'react';
import configureStore from './store/configureStore';
import {render} from 'react-dom';
import transit from 'transit-immutable-js';
import routes from './routes';

const store = configureStore(transit.fromJSON(window.__INITIAL_STATE__));

render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
