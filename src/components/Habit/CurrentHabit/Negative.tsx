import { AccountTree, ErrorOutline, Fingerprint } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { Habit } from '../../utils/types'

interface Props{
    habit:Habit,
}

const Negative:React.FC<Props> = ({habit}) => {

  return (
    <div>
        <div style={{display:'flex',paddingTop:'10px',paddingBottom:'10px',alignItems:'center',borderRadius:'0.5rem',marginTop:'2rem',flexWrap:'wrap', border:'1px solid #a5a5a546' }}>
            <div style={{marginBottom:'1rem',marginLeft:'1rem',display:'flex',alignItems:'center',marginRight:'1rem'}}>
                <Fingerprint sx={{fontSize:'2rem', color:'red'}}/>
                <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',mx:"0.4rem"}} variant="inherit" component="p">Identity: </Typography>
                <Typography sx={{fontSize:'15px',fontWeight:'bold'}} variant="inherit" component="p">{habit.identity.type} {habit.identity.name} </Typography>
            </div>
            
            <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',marginLeft:'1rem',marginRight:'1rem'}} variant="inherit" component="p">Having a habit creates a indentity based on it. Removing the habit will remove that specific identity, or removing the identity will remove the habits</Typography>
           
        </div>
        <div  style={{display:'flex',paddingTop:'10px',paddingBottom:'10px',borderRadius:'0.5rem',marginTop:'2rem',flexDirection:'column', border:'1px solid #a5a5a546' }}>
            
            <div style={{display:'flex',marginBottom:'1rem',flexDirection:'column',marginLeft:'1rem',marginRight:'1rem'}}>
                <div  style={{display:'flex',marginBottom:'1rem',alignItems:'center'}}>
                    <AccountTree sx={{fontSize:'2rem', color:'purple',marginRight:'0.5rem'}}/>
                    <Typography sx={{fontSize:'15px',fontWeight:'semi-bold'}} variant="inherit" component="p">Action System: </Typography>
                </div>
                <Typography sx={{fontSize:'15px',fontWeight:'semi-bold'}} variant="inherit" component="p">Every step of this action system contributes to your negative habit, by correcting or changing them you will eliminate your negative habit. </Typography>

            </div>
            <div style={{marginLeft:'1rem',marginRight:'1rem'}} >
                <Typography sx={{fontSize:'15px',display:'flex',flexDirection:'column'}} variant="inherit" component="h2"><Typography sx={{fontWeight:'bold',marginRight:'0.3rem', width:'full'}}>{habit.actionSystem.hint} </Typography> This is the hint that triggers you habit desire. </Typography>
                <Typography sx={{fontSize:'15px',marginY:'0.5rem',display:'flex',flexDirection:'column'}} variant="inherit" component="h2"><Typography sx={{fontWeight:'bold',marginRight:'0.3rem', width:'full'}}>{habit.actionSystem.desire}  </Typography> This is the desire that will create your reaction. </Typography>
                <Typography sx={{fontSize:'15px',marginY:'0.5rem',display:'flex',flexDirection:'column'}} variant="inherit" component="h2"><Typography sx={{fontWeight:'bold',marginRight:'0.3rem', width:'full'}}>{habit.actionSystem.reaction}  </Typography> This is the reaction that defines the habit. </Typography>
                <Typography sx={{fontSize:'15px',display:'flex',flexDirection:'column'}} variant="inherit" component="h2"><Typography sx={{fontWeight:'bold',marginRight:'0.3rem', width:'full'}}>{habit.actionSystem.reward}  </Typography> This is the reward that makes your habit pleasant. </Typography>
            </div>
        </div>
    </div>
  )
}

export default Negative