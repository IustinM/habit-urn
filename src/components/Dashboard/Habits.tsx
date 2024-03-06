import { Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Habit from './Habit'
import NoHabits from './utils/NoHabits'
import {v4 as uuid} from 'uuid'

interface Props{
  search:boolean,
  searchValue:string,
  sort:number,
  setShowCalendar:React.Dispatch<React.SetStateAction<boolean>>
}

const Habits:React.FC<Props> = ({search,searchValue,sort,setShowCalendar}) => {
  
    const habits = useSelector((state:RootState) => state.habit.habits);
    const currentDate = useSelector((state:RootState) => state.habit.currentDate);
    const [existingHabit,setExistingHabit] = useState<boolean>(false);

    const sortHabits = (habitsArray:any) =>{
      const arrayCopy = [...habitsArray]
      if(sort === 1){
       return arrayCopy.sort( (a:any, b:any) =>{
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }else if(sort ===2){
      return arrayCopy.sort( (a:any, b:any) =>{
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }else{
        return habitsArray;
      }
    }
    useEffect(()=>{
     
      const conditionHabit = habits.find((habit)=>(new Date(habit.habitDate.startDate).getTime() <= new Date(currentDate).getTime() &&new Date(habit.habitDate.endDate).getTime() >= new Date(currentDate).getTime() && habit))
      if(conditionHabit){
        setExistingHabit(true)
      }else{
        setExistingHabit(false)
      }
      
    },[habits,currentDate])
 

  return (
    <div >
        {habits.length > 0 ?
        <div>
          {existingHabit ? 
            search ? sortHabits(habits).filter((habit:any) => habit.name.match(searchValue)).map((habit:any)=> new Date(currentDate).getTime() >= new Date(habit.habitDate.startDate).getTime()  && new Date(currentDate).getTime() <= new Date(habit.habitDate.endDate).getTime()? <Habit key={uuid()} habit={habit}/> : '')
             : 
             sortHabits(habits).map((habit:any)=> new Date(currentDate).getTime() >= new Date(habit.habitDate.startDate).getTime()  && new Date(currentDate).getTime() <= new Date(habit.habitDate.endDate).getTime()? <Habit key={uuid()} habit={habit}/> : '' )
          :<NoHabits/>
          }
        </div>
        :
        <NoHabits/>
    }
    </div>
  )
}

export default Habits