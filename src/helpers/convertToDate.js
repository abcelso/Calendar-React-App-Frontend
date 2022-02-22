
import moment from 'moment';

export const convertToDate = (events = []) => {

    return events.map( ev => ({
        ...ev,
        start: moment( ev.start ).toDate(),
        end: moment( ev.end ).toDate(),
    }));
}