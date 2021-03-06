import { types } from './../types/types';


const initialState = {
    events: [],
    activeEvent: null
}

// const initialState = {
//     events: [{
//         id: new Date().getTime(),
//         title: 'Boss Birth',
//         start: moment().toDate(),
//         end: moment().add(2, 'hours').toDate(),
//         notes: 'Buy cake',
//         user: {
//             _id: '1234',
//             name: 'Alejandro',
//         },
//     }],
//     activeEvent: null
// }

export const calendarReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( action.payload.id === e.id ) ? action.payload : e
                )
            }

            case types.eventDeleted:
                return {
                    ...state,
                    events: state.events.filter(
                        e => ( e.id !== state.activeEvent.id )
                    ),
                    activeEvent: null
                }

            case types.eventLoaded:
                return {
                    ...state,
                    events: [ ...action.payload ]
                }

        default:
            return state;
    }
}