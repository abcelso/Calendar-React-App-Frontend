import Swal from "sweetalert2";
import { fetchWidthoutToken, fetchWidthToken } from "../helpers/fetch"
import { types } from "../types/types"


export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchWidthoutToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if (body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else {
            Swal.fire('Error', 'Hay un error', 'error');
        }

    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        const res = await fetchWidthoutToken('auth/new', {name, email, password}, 'POST');
        const body = await res.json();

        if (body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(register({
                uid: body.uid,
                name: body.name
            }));

        }else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {

        const res = await fetchWidthToken('auth/renew');
        const body = await res.json();

        if (body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().get);

            dispatch( renew() );
            
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const register = ( user ) => ({
    type: types.authStartRegister,
    payload: user
});

const renew = () => ({type: types.authCheckingFinish});