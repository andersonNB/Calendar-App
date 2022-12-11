import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../api/calendarApi"
import { converEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const {user} = useSelector(state =>state.auth)
    const dispatch = useDispatch()


    const setActiveEvents = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        console.log(calendarEvent)
        try {
            
            if (calendarEvent.id) {
                //DONE: llegar al backend
                await calendarApi.put(`events/${calendarEvent.id}`, calendarEvent);
    
                //DONE: Actualizar update
                //Estoy actualizando, utilizamos el spreed para creo una copia del objeto original
                //esto seria mas que todo por agregar mas complejidad a nuestra logica
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
    
                return;
            }
                                                  //ruta, body
                const {data} = await calendarApi.post('events',calendarEvent)
    
                // console.log(data)
                //Si no trae el id estoy creando
                dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))

        } catch (error) {
         console.log(error);
         Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
        
    }

    const startDeletingEvent = async() => {
        //TODO: Llegar al backend

        try {
            const {data}= await calendarApi.delete(`events/${activeEvent.id}`)
            dispatch(onDeleteEvent())

            // console.log(data)
            if(data.ok){
                Swal.fire('Se elimino correctamente', 'Evento eliminado', 'success');
            }

        } catch (error) {
            
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }

    //Esta función nos cargara los eventos que tengamos en nuestro bk
    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('events');
            const events = converEventsToDateEvents(data.eventos);
            // console.log(events)
            dispatch(onLoadEvents(events))

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

