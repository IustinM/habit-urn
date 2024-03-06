import { AccountTree, ErrorOutline, Fingerprint, Place, SettingsSuggest } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { Habit } from '../../utils/types'

interface Props{
    habit:Habit,
}

const Positive:React.FC<Props> = ({habit}) => {

  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>

        <Box style={{display:'flex',paddingTop:'10px',paddingBottom:'10px',borderRadius:'0.5rem',marginTop:'2rem',flexDirection:'column', border:'1px solid #a5a5a546' }}>
            <Box style={{marginBottom:'1rem',marginLeft:'1rem',display:'flex',alignItems:'center',marginRight:'1rem'}}>
                <Place sx={{fontSize:'2rem', color:'#00a483'}}/>
                <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',mx:"0.4rem"}} variant="inherit" component="p">Habit place: </Typography>
            </Box>
            <Box sx={{marginLeft:'1rem', marginRight:'1rem'}}>
                <Typography sx={{fontSize:'15px',mb:'1rem'}} variant="inherit" component="p"><span style={{fontWeight:'bold'}}>{habit.place}</span> is the place where your habit becomes most enjoyable </Typography>
            </Box>
        </Box>
        <Box sx={{mx:'0.5rem'}}></Box>
        <Box style={{display:'flex',paddingTop:'10px',paddingBottom:'10px',borderRadius:'0.5rem',marginTop:'2rem',flexDirection:'column', border:'1px solid #a5a5a546' }}>
            <Box style={{marginBottom:'1rem',marginLeft:'1rem',display:'flex',alignItems:'center',marginRight:'1rem'}}>
                <SettingsSuggest sx={{fontSize:'2rem', color:'#f42772'}}/>
                <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',mx:"0.4rem"}} variant="inherit" component="p">Habit improvement: </Typography>
            </Box>
            <Box style={{marginLeft:'1rem', marginRight:'1rem'}}>
                {/* <Typography sx={{fontSize:'15px'}} variant="inherit" component="p">Current habit progress:</Typography> */}
                <Typography sx={{fontSize:'15px',fontWeight:'bold',mb:'1rem'}} variant="inherit" component="p">Increasing the value of habit {habit.positiveMeasure.habitValue} by {habit.positiveMeasure.percentage}%
                will increase the result for each:</Typography>               
                <Typography  sx={{fontSize:'15px'}} variant="inherit" component="p"><span style={{fontWeight:'bold'}}>Day </span>: from {((habit.positiveMeasure.habitExpectedResult)/30).toFixed(2)} 
                 <span className=''> to</span> {((habit.positiveMeasure.habitResult)/30).toFixed(2)} </Typography>
                <Typography  sx={{fontSize:'15px'}} variant="inherit" component="p"><span style={{fontWeight:'bold'}}>Week</span> : from {((habit.positiveMeasure.habitExpectedResult)/4)} 
                 <span className=''> to</span>  {((habit.positiveMeasure.habitResult)/4).toFixed(2)}</Typography>
                <Typography  sx={{fontSize:'15px'}} variant="inherit" component="p"><span style={{fontWeight:'bold'}}>Month</span> : from {habit.positiveMeasure.habitExpectedResult} 
                 <span className=''> to</span>  {(habit.positiveMeasure.habitResult).toFixed(2)}</Typography>
                <Typography  sx={{fontSize:'15px'}} variant="inherit" component="p"><span style={{fontWeight:'bold'}}>Year</span> : from {((habit.positiveMeasure.habitExpectedResult)*12).toFixed()} 
                 <span className=''> to</span>  {((habit.positiveMeasure.habitResult)*12).toFixed(2)}</Typography>
            </Box>
                
           
        </Box>
    </Box>
  )
}

export default Positive