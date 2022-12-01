import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { converEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const {user} = useSelector(state =>state.auth)
    const dispatch = useDispatch()


    const setActiveEvents = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        //TODO: llegar al backend
        //TODO: Actualizar update
        if (calendarEvent._id) {
            //Estoy actualizando, utilizamos el spreed para creo una copia del objeto original
            //esto seria mas que todo por agregar mas complejidad a nuestra logica
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
                                              //ruta, body
            const {data} = await calendarApi.post('events',calendarEvent)

            // console.log(data)
            //Si no trae el id estoy creando
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
        }
    }

    const startDeletingEvent = () => {
        //TODO: Llegar al backend
        dispatch(onDeleteEvent())
    }

    //Esta función nos cargara los eventos que tengamos en nuestro bk
    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('events');
            const events = converEventsToDateEvents(data.eventos);

            console.log(events)

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
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
        startLoadingEvents,
    }
}

