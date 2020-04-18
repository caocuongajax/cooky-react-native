import React, { Component } from 'react';
import AppNavigation from './navigation/index';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light } from '@eva-design/eva';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider mapping={mapping} theme={light}>
                    <AppNavigation />
                </ApplicationProvider>
            </Provider>
        )
    }
}