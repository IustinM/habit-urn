import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface ModalState {
    viewAddHabitModal: boolean,
    editMode:boolean
}

// Define the initial state using that type
const initialState: ModalState = {
  viewAddHabitModal: false,
  editMode:false
}

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setViewAddHabitModal: (state:any,action:PayloadAction<boolean>) => {
      state.viewAddHabitModal = action.payload
    },
    setEditMode:(state:any,action:PayloadAction<boolean>) => {
      state.editMode = action.payload
    }
   
  },
})

export const { setViewAddHabitModal,setEditMode } = modalSlice.actions


export default modalSlice.reducer