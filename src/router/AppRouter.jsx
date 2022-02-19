import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { startChecking } from '../actions/auth';
// import { PublicRoute } from './PublicRoute';
// import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {

        dispatch( startChecking() );

    }, [dispatch]);

    if (checking) {
        return (<h5>Espere, cargando...</h5>);
    }

    return (
        <Router>
            <div>
            <Switch>
                <Route
                    exact
                    path="/login"
                    component={ LoginScreen }
                    isAuthenticated={!!uid}
                />
                <Route
                    exact
                    path="/"
                    component={ CalendarScreen }
                    isAuthenticated={!!uid}
                    />

                <Redirect to="/" />
            </Switch>
            </div>
        </Router>
    )
}
