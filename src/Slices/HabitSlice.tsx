import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface HabitState {
    habits: any[],
    habit:any,
}

// Define the initial state using that type
const initialState: HabitState = {
  habits: [],
  habit:null
}

export const habitSlice = createSlice({
  name: 'habit',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetHabits:(state:any,action:PayloadAction<any>) =>{
      state.habits = [...action.payload]
    },
    setHabits: (state:any,action:PayloadAction<any>) => {
      state.habits = [...state.habits,action.payload]
    },
    setHabit:(state:any,action:PayloadAction<any>) =>{
        state.habit = action.payload
      },
      editHabitsState:(state:any,action:PayloadAction<any>) =>{
      state.habits = action.payload
    }
   
   
  },
})

export const { setHabits,setHabit,resetHabits,editHabitsState } = habitSlice.actions


export default habitSlice.reducer