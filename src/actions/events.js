import { types } from "../types/types";


export const eventAddnew = (event) => ({
    type: types.eventAddnew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({type: types.eventClearActieEvent});

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const eventDeleted = (event) => ({
    type: types.eventDeleted,
    payload: event
})