import { Delete } from '@mui/icons-material'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { basicHabitObject } from '../EditHabit'


interface Props{
    setTargetError:React.Dispatch<React.SetStateAction<boolean>>,
    habitTarget:basicHabitObject,
    setHabitTarget:React.Dispatch<React.SetStateAction<basicHabitObject>>,
    
   
}

const TargetError:React.FC<Props> = ({setTargetError,habitTarget,setHabitTarget}) => {

    const {habits} = useSelector((state:RootState) => state.habit);
    const dispatch = useDispatch();

    const resetHabit = () =>  {
        setHabitTarget({...habitTarget,currentValue:'0'})
        setTargetError(false);
    }
    console.log(habitTarget)


  return (
    <div style={{position:'fixed',top:0,left:0,backdropFilter:'blur(3px)',color:'#606060',background:'rgba(52, 58, 65, 0.600000)',width:'100%',minHeight:'100vh',zIndex:'50',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Box style={{background:'white',borderRadius:'0.5rem',width:'400px',display:'flex',flexDirection:"column", alignItems:'center',justifyContent:'center',minHeight:'200px',overflowY:'scroll'}}>
            <Typography variant='subtitle1' sx={{textAlign:'center',marginBottom:'1rem'}} component='h6'>If you change the target value it will result <br/> in resetting your current target progress.</Typography>
            <Toolbar sx={{display:'flex',width:'70%', marginLeft:'auto',marginRight:'auto', justifyContent:'space-around'}}>
                <Button onClick={resetHabit}  variant='contained' >Change</Button>
                <Button variant='contained' onClick={() => setTargetError(false)} sx={{background:'#c30d0d','&:hover':{background:'#c30d0d'}}}>Cancel</Button>
            </Toolbar>
        </Box>
    </div>
  )
}

export default TargetError