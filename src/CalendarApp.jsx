import React from 'react'
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store/store';

export const CalendarApp = () => {
    // console.log(process.env.REACT_APP_URL);
    // console.log(import.meta.env.REACT_APP_URL);

    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
