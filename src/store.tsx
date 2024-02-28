import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from './Slices/ModalSlice';
import HabitReducer from './Slices/HabitSlice';
export const store = configureStore({
    reducer:{
        modal:ModalReducer,
        habit:HabitReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch