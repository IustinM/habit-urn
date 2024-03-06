import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';

 interface Props{
    targetType:string,
    title:string,
    setTitle:(value:string)=>void,
}

// return ( <FormControl sx={{ width:'100%'}}>
// <InputLabel id="how-times-select-label">How often </InputLabel>
// <Select
// labelId="how-times-select-label"
// id="how-times-select-id"
// value={title}
// defaultValue={title}
// label="How often "
// onChange={(e:any) => setTitle(e.target.value)} 
// >
//     <MenuItem value={'Per Day'}>Per Day</MenuItem>
//     <MenuItem value={'Per Week'}>Per Week</MenuItem>
//     <MenuItem value={'Per Month'}>Per Month</MenuItem>
// </Select>
// </FormControl>)

const TargetType:React.FC<Props> = ({targetType,title,setTitle}) => {


   
    const returnComponent = () =>{
        switch(targetType){
            case 'Times':
                return (
                    
                <Box  sx={{width:'100%', height:'56px',borderRadius:'0.3rem',display:'flex',alignItems:'center',paddingX:'0.7rem',border:'1px solid #6b6b6b7e'}}>
                    <Typography component={'h2'} variant={'subtitle1'}>Times</Typography>
                </Box>
                )
               
            case 'Timer':
                return (
                    <FormControl sx={{ width:'100%'}}>
                    <InputLabel id="how-often-select-label">Duration</InputLabel>
                    <Select
                    labelId="how-often-select-label"
                    id="how-often-select-id"
                    value={title}
                    defaultValue={title}
                    label="Duration"
                    onChange={(e:any) => setTitle(e.target.value)} 
                    >
                        <MenuItem value={'sec'}>sec</MenuItem>
                        <MenuItem value={'min'}>min</MenuItem>
                        <MenuItem value={'hr'}>hr</MenuItem>
                    </Select>
                </FormControl>
                )
            default:
                return( <TextField id="target-type" label="Target name*" value={title ||  ''} variant="outlined" onChange={(e:ChangeEvent<HTMLInputElement>)=>  setTitle(e.target.value)} />)
        }
    }

  return (
    <div style={{width:'200px'}}>
        {returnComponent()}
    </div>
  )
}

export default TargetType