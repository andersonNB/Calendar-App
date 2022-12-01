import { createSlice } from '@reduxjs/toolkit';
import { addHours } from "date-fns";

// const tempEvent = {
//     _id: new Date().getTime(),
//     bgColor: "#fafafa",
//     end: addHours(new Date(), 2),
//     user: { _id: "123", name: "Anderson" },
//     notes: "Hay que comprar el pastel",
//     start: new Date(),
//     title: "Cumpleaños del Jefe",
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        // Esta proiedad es para saber si estan cargando
        // los eventos desde nuestro bk
        isLoadingEvents:true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => {

                if (event.id === payload.id) {
                    return payload;
                }

                return event;
            })
        },

        onDeleteEvent: (state) => {
            if (state.activeEvent) {

                state.events = state.events.filter(event => event.id !== state.activeEvent.id)
                state.activeEvent = null;
            }
        },

        onLoadEvents:(state, { payload =[] })=>{
            //Lo ponemos en false ya que los eventos
            //existen o estan empezando a cargarse
            state.isLoadingEvents = false;
            // 1.forma -> forma tradiacional
            // state.events = payload;

            // 2.forma -> un poco mas de logica verificando
            // si no existe mi evento por el id lo añado
            payload.forEach(event=>{
 
                //some devuelve true o false dependiendo de si lo encuentra
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);

                if(!exists){
                    state.events.push(event);
                }


            })

        },


        onClearCalendar:(state,{payload})=>{
            state.activeEvent= null;   
            state.events=[];
            state.isLoadingEvents=true;
        }

    }
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvents,onClearCalendar } = calendarSlice.actions;