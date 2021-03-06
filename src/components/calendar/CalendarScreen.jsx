import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';

import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'moment/locale/es';

import './calendar.css';

import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, startEventsLoaded } from '../../actions/event';
import { FabButton } from './../ui/FabButton';
import { DeleteFab } from '../ui/DeleteFab';

// Idioma del texto
moment.locale('es');

const localizer = momentLocalizer(moment);

// Carga los datos de los eventos
// const events = [
//     {
//         title: 'Boss Birth',
//         start: moment().toDate(),
//         end: moment().add(2, 'hours').toDate(),
//         notes: 'Buy cake',
//         user: {
//             name: 'Alejandro',
//         },
//     },
// ];



export const CalendarScreen = () => {

    const { uid } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startEventsLoaded() );
    }, [dispatch]);

    const lastV = localStorage.getItem('lastView') || 'month';

    const [lastView, setLastView] = useState(lastV);

    const {events, activeEvent} = useSelector(state => state.calendar);

    // console.log(events);

    const onDoubleClick = (e) => {
        // console.log(e);
        dispatch( uiOpenModal() );
    };

    const onSelectChange = (e) => {
        // console.log(e);
        dispatch( eventSetActive( e ) );
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    // Muestra los eventos
const eventStyleGetter = (event, start, end, isSelected) => {

    console.log(event);
    // Estilo del evento
    const style = {
        backgroundColor: (event.user._id === uid) ? '#367CF7' : '#88919f',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        color: 'white',
    };

    return {
        style,
    };
};

    return (
        <div>
            <NavBar />

            <Calendar
                localizer={localizer}
                events={ events }
                startAccessor='start'
                endAccessor='end'
                eventPropGetter={eventStyleGetter}
                style={{ height: '100vh' }}
                messages={messages}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectChange}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent,
                }}
            />

            {
                activeEvent &&
                <DeleteFab />
            }

            <FabButton />

            <CalendarModal />
        </div>
    );
};
