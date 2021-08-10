import React, { useEffect, useState } from 'react';
import Navbar from '../ui/Navbar';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-esp';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export default function CalendarScreen() {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const dispatch = useDispatch();
    const {uid} = useSelector( state => state.auth );

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    const {events, activeEvent} = useSelector( state => state.calendar );

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGeter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id ) ? '#367cf7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar 
                localizer={localizer}
                events={events}
                startAccesor="start"
                endAccessor="end"
                messages={messages}
                onDoubleClickEvent= {onDoubleClick}
                onSelectEvent={onSelectEvent}
                eventPropGetter={eventStyleGeter}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                activeEvent &&
                    <DeleteEventFab />
            }            

            <CalendarModal />
        </div>
    )
}
