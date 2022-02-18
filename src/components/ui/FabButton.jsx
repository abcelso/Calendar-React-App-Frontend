import React from 'react'
import { uiOpenModal } from '../../actions/ui';
import { useDispatch } from 'react-redux';

export const FabButton = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <div>
            <button
                className="btn btn-primary fab"
                onClick={ handleClick }>
               <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
    )
}

