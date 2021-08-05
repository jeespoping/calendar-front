import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddnew, eventClearActiveEvent, eventUpdated } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      z_index: 4
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus1 = now.clone().add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export default function CalendarModal() {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());


    const {modalOpen} = useSelector( state => state.ui );

    const {activeEvent} = useSelector(state => state.calendar)

    const [titlevalid, settitlevalid] = useState(true)

    const [fromvalues, setFromvalues] = useState(initEvent);

    const {notes, title, start, end} = fromvalues;

    useEffect(() => {
        if(activeEvent){
            setFromvalues(activeEvent);
        }else{
            setFromvalues(initEvent);
        }
        
    }, [activeEvent, setFromvalues])

    const handleInputChange = ({target}) => {
        setFromvalues({
            ...fromvalues,
            [target.name]: target.value
        })
    }

    const dispatch = useDispatch()

    const closeModal = () => {
        //Todo cerrar moda
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFromvalues(initEvent);
    }

    const handleStartOnChange = (e) =>{
        setDateStart(e);
        setFromvalues({
            ...fromvalues,
            start: e
        })
    }

    const handleEndOnChange = (e) => {
        setDateEnd(e)
        setFromvalues({
            ...fromvalues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end)

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'La fecha fin debe ser mayot a la fecha de inicio', 'error')
        }

        if(title.trim().length < 2){
            return settitlevalid(false);
        }

        if(activeEvent){
            dispatch(eventUpdated(fromvalues))
        }else{
            dispatch(eventAddnew({
                ...fromvalues,
                id: new Date().getTime(),
                user: {
                    _id: '1234',
                    name: 'Jesus'
                }
            }));
        }       

        settitlevalid(true)
        closeModal();
    }

    return (        
        <Modal 
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        onChange={handleStartOnChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        onChange={handleEndOnChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label> 
                    <input 
                        type="text" 
                        className={`form-control ${!titlevalid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
