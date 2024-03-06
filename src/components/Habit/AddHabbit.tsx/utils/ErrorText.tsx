import { Report } from '@mui/icons-material'
import { Box, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface Props{
    text:string,
}

const ErrorText:React.FC<Props> = ({text}) => {
  return (
    <Box sx={{display:'flex',alignItems:'center',color:'#f42727'}}>
      <Report sx={{fontSize:'2rem',mr:'0.5rem'}}/>
        <Typography variant="subtitle1" component="h2" sx={{fontWeight:'bold'}}>
          {text}
        </Typography>
    </Box>
  )
}

export default ErrorText