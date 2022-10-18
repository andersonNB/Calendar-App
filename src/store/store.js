import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./";

export const store = configureStore({
    //Mandamos los reducers como tal
    reducer: {
        ui: uiSlice.reducer,
    }
})