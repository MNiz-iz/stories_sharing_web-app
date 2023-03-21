    import React from 'react';
    //import ReactDom from 'react-dom/client';
    import { createRoot } from 'react-dom/client';
    import { Provider } from 'react-redux';
    //import { configureStore } from "@reduxjs/toolkit";
    import { createStore, applyMiddleware, compose } from 'redux';
    import thunk from 'redux-thunk';
    //use reducer from folder reducers file index.js
    import reducers from './reducers';

    import App from './App';
    import './index.css';

    const store = createStore(reducers, compose(applyMiddleware(thunk)));

    const root = createRoot(document.getElementById('root'));
    root.render(
        <Provider store={ store }>
            <App />
        </Provider>);
    