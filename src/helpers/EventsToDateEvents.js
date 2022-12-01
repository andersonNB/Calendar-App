//este archivo estara encargado de convertir las fechas que llegan
//del bk a un formato que el calendario lo pueda entender y renderizar
import { parseISO } from "date-fns";


export const converEventsToDateEvents =(events=[])=>{

    return events.map(event=>{

        //Parseamos el string que nos llega de la fecha 
        //a su respectivo valor entero
        event.start =parseISO(event.end);
        event.end = parseISO(event.end);

        return event;

    })

}