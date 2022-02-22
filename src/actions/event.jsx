
import { types } from './../types/types';
import { fetchWidthToken } from './../helpers/fetch';
import { convertToDate } from '../helpers/convertToDate';
import Swal from 'sweetalert2';


export const eventStartAddNew = ( event ) => {
    return async(dispatch, getState) => {

        const {uid, name} = getState().auth;

        try {

            console.log('event', event);
            const resp = await fetchWidthToken('events', event, 'POST');
            const body = await resp.json();

            console.log('body', body);

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch( eventAddNew( event ) );
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const startEventsLoaded = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchWidthToken('events');
            const body = await resp.json();

            const events = convertToDate( body.events );
            // console.log(events);

            dispatch( eventLoad(events) );

        } catch (error) {
            console.log(error);
        }
    }
}

export const eventStartUpdated = ( event ) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWidthToken(`events/${ event.id }`, event, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch( eventUpdated( event ) );
            }else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const eventStartDeleted = () => {
    return async(dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchWidthToken(`events/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch( eventDeleted() );
            }else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = ( ) => ({
    type: types.eventDeleted
});

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

const eventLoad = (events) => ({
    type: types.eventLoaded,
    payload: events
})


export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = ( ) => ({
    type: types.eventClearActiveEvent
});



