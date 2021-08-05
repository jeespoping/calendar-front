import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventDeleted } from '../../actions/events';

export default function DeleteEventFab() {
    const dispatch = useDispatch();
    const {activeEvent} = useSelector( state => state.calendar );

    const handleDelete = () => {
        dispatch(eventDeleted(activeEvent))
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
        </button>
    )
}
