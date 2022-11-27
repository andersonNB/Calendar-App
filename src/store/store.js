import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";
//Con el middleware nos sirve para evitar el error en las fechas del calendario
//ya que mandamos como tal un objeto string con fechas en vez de un número que represente
//esas fechas
export const store = configureStore({
    //Mandamos los reducers como tal
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})