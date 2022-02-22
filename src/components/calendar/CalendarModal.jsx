import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';

import moment from 'moment'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdated } from '../../actions/event';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const nowTask = moment().minute(0).seconds(0).add(1, 'hours');

const endTask = nowTask.clone().add(1, 'hours');

const initialState = {
    title: '',
    notes: '',
    start: nowTask.toDate(),
    end: endTask.toDate()
};

export const CalendarModal = () => {

    const [startDate, setStartDate] = useState(nowTask.toDate());

    const [endDate, setEndDate] = useState(endTask.toDate());

    const [titleValid, setTitleValid] = useState(true);

    const [ formValues, setValues, handleInputChange ] = useForm( initialState );

    const { title, notes, start, end } = formValues;

    const isOpen = useSelector(state => state.ui.openModal);

    const {activeEvent} = useSelector(state => state.calendar);

    const dispatch = useDispatch();


    useEffect(() => {

        if (activeEvent) {
            setValues( activeEvent )
        }

    }, [activeEvent]);

    const closeModal = () => {
        dispatch( uiCloseModal() );
        setValues( initialState );
        dispatch( eventClearActiveEvent() );
    };

    const handleStartDateChange = ( e ) => {
        setStartDate( e );
        setValues({
            ...formValues,
            start: e
        });
        console.log( e );
    }

    const handleEndDateChange = ( e ) => {
        setEndDate( e );
        setValues({
            ...formValues,
            end: e
        });
        console.log('end', e);
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error', 'Start date is after to endTask date', 'error');

        }

        if (title.length < 2) {
            return setTitleValid(false);
        }

        if (activeEvent){
            dispatch( eventStartUpdated( formValues ) );
        }else {
            dispatch( eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <div>
            <Modal
                className='modal'
                isOpen={isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                overlayClassName='modal-fondo'
                contentLabel='Example Modal'>

                <h1> Nuevo evento </h1>
                <hr />
                <form
                    onSubmit = { handleSubmit }
                    className='container'>
                    <div className='form-group'>
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={startDate}
                            className='form-control'
                        />
                    </div>

                    <div className='form-group'>
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={endDate}
                            minDate={startDate}
                            className='form-control'
                        />
                    </div>

                    <hr />
                    <div className='form-group'>
                        <label>Titulo y notas</label>
                        <input
                            type='text'
                            className={
                                `form-control
                                ${!titleValid
                                &&
                                'is-invalid'}`
                            }
                            placeholder='Título del evento'
                            name='title'
                            value={ title }
                            autoComplete='off'
                            onChange={ handleInputChange }
                        />
                        <small id='emailHelp' className='form-text text-muted'>
                            Una descripción corta
                        </small>
                    </div>

                    <div className='form-group'>
                        <textarea
                            type='text'
                            className='form-control'
                            placeholder='Notas'
                            rows='5'
                            values={ notes }
                            name='notes'
                            onChange={ handleInputChange }>
                        </textarea>
                        <small id='emailHelp' className='form-text text-muted'>
                            Información adicional
                        </small>
                    </div>
                    <div className="d-grid gap-2">
                        <button
                            type='submit'
                            className='btn btn-outline-primary btn-block mt-2'>
                            <i className='far fa-save'></i>
                            <span> Guardar</span>
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
