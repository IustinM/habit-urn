import { CreditCard, DirectionsRun, SelfImprovement } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

interface ColumnProps{
    iconType:string,
}

const Column:React.FC<ColumnProps> = ({iconType}) => {

    const returnIcon = () =>{
        switch(iconType){
            case 'run':{
                return( <DirectionsRun sx={{width:'25px',height:'25px',color:'#ea2b2b'}}/>)
            }
            case 'money':{
                return ( <CreditCard sx={{width:'25px',height:'25px',color:'#009b4d'}}/>)
            }
            case 'mental':{
                return ( <SelfImprovement sx={{width:'25px',height:'25px',color:'#00baf2'}}/>)
            }
        }
    }
    
    return(
        <Box sx={{width:'200px', px:'0.5rem',height:'45px', display:'flex',borderRadius:'0.3rem', alignItems:'center',justifyContent:'space-around',border:'1px solid #81818161'}}>
            {returnIcon()}
            <Box sx={{display:'flex',ml:'0.5rem',flexDirection:'column'}}>
                <Box sx={{height:'13px',width:'150px',background:'#81818161',borderRadius:'0.2rem'}}></Box>
                <Box sx={{height:'8px',width:'150px',marginTop:'0.5rem',background:'#81818161',borderRadius:'0.2rem'}}></Box>
            </Box>
        </Box>
    )
}

const NoHabits = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center',flexDirection:'column',alignItems:'center',height:'90vh'}} >
        <Column iconType='run'/>
        <Box sx={{my:'1rem'}}>
            <Column iconType='money'/>
        </Box>
        <Column iconType='mental'/>
        <Typography variant='subtitle1' component='h4' sx={{textAlign:'center', pt:'1rem',fontWeight:'500', fontSize:'0.9rem'}} >There are no habits added <br/> for this date </Typography>
    </Box>
  )
}

export default NoHabits