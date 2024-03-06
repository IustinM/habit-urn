import { Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { habitRange } from '../../../utils/types'
import { basicHabitObject } from '../EditHabit'



interface Props{
    setTargetError:React.Dispatch<React.SetStateAction<boolean>>,
    habitTarget:basicHabitObject,
    setHabitTarget:React.Dispatch<React.SetStateAction<basicHabitObject>>,
    habitRange:habitRange,
    setHabitRange:React.Dispatch<React.SetStateAction<habitRange>>,
    submitNewValue:()=>void
   
}

const TargetError:React.FC<Props> = ({setTargetError,habitTarget,setHabitTarget,habitRange,setHabitRange,submitNewValue}) => {

    const resetHabit = () =>  {
        setHabitTarget({...habitTarget,currentValue:'0'})
        setHabitRange({...habitRange,current:0})
        setTargetError(false);
        submitNewValue();
    }

  return (
    <div style={{position:'fixed',top:0,left:0,backdropFilter:'blur(3px)',color:'#606060',background:'rgba(52, 58, 65, 0.600000)',width:'100%',minHeight:'100vh',zIndex:'50',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Box style={{background:'white',borderRadius:'0.5rem',width:'400px',display:'flex',flexDirection:"column", alignItems:'center',justifyContent:'center',minHeight:'200px',overflowY:'scroll'}}>
            <Typography variant='subtitle1' sx={{textAlign:'center',marginBottom:'1rem'}} component='h6'>By changing this value it will result <br/> in resetting your current target progress.</Typography>
            <Toolbar sx={{display:'flex',width:'70%', marginLeft:'auto',marginRight:'auto', justifyContent:'space-around'}}>
                <Button onClick={resetHabit}  variant='contained' >Change</Button>
                <Button variant='contained' onClick={() => setTargetError(false)} sx={{background:'#c30d0d','&:hover':{background:'#c30d0d'}}}>Cancel</Button>
            </Toolbar>
        </Box>
    </div>
  )
}

export default TargetError