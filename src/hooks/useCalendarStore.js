import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch()


    const setActiveEvents = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        //TODO: llegar al backend

        if (calendarEvent._id) {
            //Estoy actualizando, utilizamos el spreed para creo una copia del objeto original
            //esto seria mas que todo por agregar mas complejidad a nuestra logica
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            //Si no trae el id estoy creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }

    const startDeletingEvent = () => {
        //TODO: Llegar al backend
        dispatch(onDeleteEvent())
    }


    return {
        //propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //metodos
        setActiveEvents,
        startSavingEvent,
        startDeletingEvent,
    }
}
