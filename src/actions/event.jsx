
import { types } from './../types/types';
import { fetchWidthToken } from './../helpers/fetch';

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

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

export const eventClearActiveEvent = ( ) => ({
    type: types.eventClearActiveEvent
});

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = ( ) => ({
    type: types.eventDeleted
});

