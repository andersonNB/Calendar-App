import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

export const store = configureStore({
    //Mandamos los reducers como tal
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    }
})