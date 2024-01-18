// pages/_app.js

import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
    const persistor = persistStore(store); 
    // 这里可以进行全局配置或布局设置
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </>
    );
}

export default MyApp;
