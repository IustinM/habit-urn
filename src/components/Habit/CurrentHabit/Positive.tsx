import { AccountTree, ErrorOutline, Fingerprint, SettingsSuggest } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

interface Props{
    habit:any,
}

const Positive:React.FC<Props> = ({habit}) => {

    const returnFrequency = () => {
        switch(habit.positiveMeasure.frequency){
            case 30:
                return 'daily';
            case 4:
                return 'weekly';
            case 1:
                return 'monthly';
            default:
                return 'monthly'
        }
    }
  return (
    <div>
        <div style={{display:'flex',paddingTop:'10px',paddingBottom:'10px',borderRadius:'0.5rem',marginTop:'2rem',flexDirection:'column', border:'1px solid #a5a5a546' }}>
            <div style={{marginBottom:'1rem',marginLeft:'1rem',display:'flex',alignItems:'center',marginRight:'1rem'}}>
                <SettingsSuggest sx={{fontSize:'2rem', color:'#f42772'}}/>
                <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',mx:"0.4rem"}} variant="inherit" component="p">Habit improvement: </Typography>
            </div>
            <div style={{marginLeft:'1rem', marginRight:'1rem'}}>
                {/* <Typography sx={{fontSize:'15px'}} variant="inherit" component="p">Current habit progress:</Typography> */}
                <Typography sx={{fontSize:'15px',fontWeight:'bold'}} variant="inherit" component="p">Increasing the habit by {habit.positiveMeasure.percentage}%
                will result a difference of:</Typography>
                <Typography  sx={{fontSize:'15px',fontWeight:'bold'}} variant="inherit" component="p">{habit.positiveMeasure.habitValue} 
                 to  {((habit.positiveMeasure.habitValue*habit.positiveMeasure.percentage)/100)+habit.positiveMeasure.habitValue}</Typography>
                {/* <Typography sx={{fontSize:'15px',fontWeight:'bold'}} variant="inherit" component="p">  {habit.positiveMeasure.habitExpectedResult} </Typography> */}
            </div>
                
           
        </div>
    </div>
  )
}

export default Positive