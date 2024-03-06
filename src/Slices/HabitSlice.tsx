import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Habit } from '../components/utils/types'


interface HabitState {
  habits: Habit[],
  habit:Habit,
  currentDate:string,
  showCurrentHabit:boolean,
}

// Define the initial state using that type
const initialState: HabitState = {
  habits: [],
  habit:   {
    id:'',
    name:'',
    type:'',
    category:'',
    target:{category:'',title:'',value:'',currentValue:''},
    habitDate:{
        startDate:'',
        endDate: '',
        key: 'selection',
    },
    currentDate:'',
    expectedResults:[],
    identity:{name:'',type:''},
    actionSystem:{
        hint:'',
        desire:'',
        reaction:'',
        reward:''
    },
    positiveMeasure:{
        percentage:0,
        habitValue:0,
        habitResult:0,
        habitExpectedResult:0,
    },
    place:'',
    habitRange:{
        current:0,
        total:0
    }
},
  currentDate:new Date(new Date().setHours(0,0,0,0)).toISOString(),
  showCurrentHabit:false
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
    },
    setCurrentDate:(state:any,action:PayloadAction<any>) =>{
      state.currentDate = action.payload
    },
    setShowCurrentHabit:(state:any,action:PayloadAction<any>) => {
      state.showCurrentHabit = action.payload
    }
   
   
  },
})

export const { setHabits,setHabit,resetHabits,editHabitsState,setCurrentDate,setShowCurrentHabit } = habitSlice.actions


export default habitSlice.reducer