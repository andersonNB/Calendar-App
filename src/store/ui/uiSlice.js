import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
    },
    reducers: {
        onOpenDateModal: (state) => {
            //Esta sintaxis fuera de redux-toolkit es 
            //basicamente mutar directamente el estado
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        }
    }
});
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;