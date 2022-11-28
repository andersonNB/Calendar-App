import { createSlice } from '@reduxjs/toolkit';

/**
 * status -> con esta propiedad verificamos si el usuario
 * esta autenticado o no
 * user -> propiedades del usuario se guardan en un obj
 * errorMessage -> controlamos los mensajes
 */

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //authenticated, not-authenticated
        user: {},
        errorMessage:undefined,
    },
    reducers: {
        // Verificando el estado de la autentificación
        onChecking: (state, /* action */ ) => {
            state.status ='checking';
            state.user = {};
            state.errorMessage = undefined
        },
        // En este punto todo salio correcto y el usuario estara logueado
        onLogin:(state, { payload })=>{
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
    }
});
export const { onChecking,onLogin } = authSlice.actions;