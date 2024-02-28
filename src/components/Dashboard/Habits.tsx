import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Habit from './Habit'

interface Props{
  search:boolean,
  searchValue:string,
  sort:number
}

const Habits:React.FC<Props> = ({search,searchValue,sort}) => {
  
    const habits = useSelector((state:RootState) => state.habit.habits);

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
  return (
    <div>
        {habits.length > 0 ?
        <div>
            {search ? sortHabits(habits).filter((habit:any) => habit.name.match(searchValue)).map((habit:any)=> <Habit habit={habit}/>)
             : 
             sortHabits(habits).map((habit:any)=> <Habit habit={habit}/>)}
        </div>
        :
        <Typography component='h2' variant='h6'>No habits added</Typography>
    }
    </div>
  )
}

export default Habits