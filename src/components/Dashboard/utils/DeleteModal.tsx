import { Delete } from '@mui/icons-material'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import React, { MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHabitsState,  setShowCurrentHabit } from '../../../Slices/HabitSlice'
import { RootState } from '../../../store'
import { Habit } from '../../utils/types'

interface Props{
    setViewDelete:React.Dispatch<React.SetStateAction<boolean>>,
    habit:Habit,
}

const DeleteModal:React.FC<Props> = ({setViewDelete,habit}) => {

    const {habits} = useSelector((state:RootState) => state.habit);

    const dispatch = useDispatch();

    const deleteHabitHandler = (e:MouseEvent)=>{

        // e.stopPropagation()
        const newHabits = [];
    
        for(let i = 0 ;i<habits.length;i++){
            if(habits[i].id !== habit.id){
                newHabits.push(habits[i]);
            }
        }
        setViewDelete(false);
        dispatch(editHabitsState([...newHabits]));
        dispatch(setShowCurrentHabit(false));
    }
    
 
    

  return (
    <div onClick={(e) => e.stopPropagation()} style={{position:'fixed',top:0,left:0,backdropFilter:'blur(3px)',color:'#606060',background:'rgba(52, 58, 65, 0.600000)',width:'100%',minHeight:'100vh',zIndex:'50',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Box style={{background:'white',borderRadius:'0.5rem',width:'400px',display:'flex',flexDirection:"column", alignItems:'center',justifyContent:'center',minHeight:'200px',overflowY:'scroll'}}>
            <Typography variant='subtitle1' sx={{textAlign:'center',marginBottom:'1rem'}} component='h6'>Are you sure you want to <br/>delete this habbit?</Typography>
            <Toolbar sx={{display:'flex',width:'70%', marginLeft:'auto',marginRight:'auto', justifyContent:'space-around'}}>
                <Button onClick={(e:MouseEvent)=>deleteHabitHandler(e)} variant='contained' startIcon={<Delete/>}>Delete</Button>
                <Button variant='contained' onClick={() => setViewDelete(false)} sx={{background:'#c30d0d','&:hover':{background:'#c30d0d'}}}>Cancel</Button>
            </Toolbar>
        </Box>
    </div>
  )
}

export default DeleteModal