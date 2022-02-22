import React from 'react'
import { useDispatch } from 'react-redux';
import {  eventStartDeleted } from './../../actions/event';

export const DeleteFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( eventStartDeleted() );
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }>
            <i class="fa fa-trash" aria-hidden="true"></i>
            <span> Delete</span>
        </button>
    )
}
