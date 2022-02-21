import React, { useEffect, useState } from 'react'
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

    const {checking} = useSelector(state => state.auth);

    const [tokenExist, setTokenExist] = useState("");


    console.log(checking);

    useEffect(() => {

        const eject = () => {

            setTokenExist(localStorage.getItem('token'));

            if (!!tokenExist){
                dispatch( startChecking() );
            }

        }

        eject();

    }, [dispatch, tokenExist]);


    if (checking && !!tokenExist) {
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
                />
                <Route
                    exact
                    path="/"
                    component={ CalendarScreen }
                />

                <Redirect to="/" />
            </Switch>
            </div>
        </Router>
    )
}
