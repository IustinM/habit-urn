import { Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Divider, SelectChangeEvent } from '@mui/material'
import { DatePicker, TimeClock } from '@mui/x-date-pickers';
import { v4 as uuid } from 'uuid';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Timer } from '@mui/icons-material';
import TargetType from './utils/TargetType';
import dayjs from 'dayjs';

interface basicHabitObject  {
    [property:string]:string
}

interface Props{
    habitName:string,
    setHabitName:React.Dispatch<React.SetStateAction<string>>,
    habitType:string,
    setHabitType:React.Dispatch<React.SetStateAction<string>>,
    habitCategory:string,
    setHabitCategory:React.Dispatch<React.SetStateAction<string>>,
    habitTarget:basicHabitObject,
    setHabitTarget:React.Dispatch<React.SetStateAction<basicHabitObject>>,
    habitTargetDate:Date,
    setHabitTargetDate:React.Dispatch<React.SetStateAction<Date>>, 
    habitExpectedResults:basicHabitObject[],
    setHabitExpectedResults:React.Dispatch<React.SetStateAction<basicHabitObject[]>>,
}

const AddHabitColumnOne:React.FC<Props> = ({habitName,setHabitName,habitType,setHabitType,habitCategory,setHabitCategory,habitTarget,setHabitTarget,habitTargetDate,setHabitTargetDate,habitExpectedResults,setHabitExpectedResults}) => {
    const habitCateogoryData = ['Health','Productivity and Personal Development','Social Relationships','Mental and Emotional Well-being','Financial','Daily Responsibilities','Other']
    const [localHabitTargetResults,setLocalHabitTargetResults] = useState<string>('');
    const [targetType,setTargetType] = useState<string>('Other');

    const textFieldHandler = (e:React.SyntheticEvent,setState:React.Dispatch<React.SetStateAction<string>>):void =>{
        const target = e.target as HTMLInputElement;
        setState(target.value)
    }

    const habitTargetResultsHandler = ():void =>{
        if(localHabitTargetResults.length > 0){
            setHabitExpectedResults([...habitExpectedResults,{id:uuid(),text:localHabitTargetResults}])
        }
    }

    const setHabitTargetValue = (e:ChangeEvent<HTMLInputElement>) => {
        setHabitTarget({...habitTarget,value:e.target.value});
    }

    const changeDateHandler = (value:any) => {
        setHabitTargetDate(new Date(value["$d"]));
    }
    
    useEffect(()=>{
        setHabitTarget({...habitTarget,title:''})
    },[habitTarget.category])

    
    return (
    <div >
        <div style={{display:'flex',justifyContent:'space-between'}}>
            
        <Typography variant='h6' sx={{marginBottom:'1rem'}} component='h4'>Basic habit details</Typography>
        <Box sx={{display:'flex',flexDirection:'column'}}></Box>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{display:'flex',flexDirection:'column',width:'45%'}} >
                    <TextField value={habitName || ''} id="habit-name" label="Habit name*" variant="outlined" onChange={(e:React.SyntheticEvent)=> textFieldHandler(e,setHabitName)} />
                    <div style={{display:'flex',marginTop:'2rem'}}>
                        <FormControl sx={{  minWidth: 180 }}>
                                <InputLabel id="target-category-type">Target Category*</InputLabel>
                                <Select
                                labelId="target-category-type"
                                id="target-category-select"
                                value={habitTarget.category}
                                label="Target category"
                                onChange={(event:SelectChangeEvent<string>)=>setHabitTarget({...habitTarget,category:event.target.value})}
                                >
                                    <MenuItem value='Timer'>Timer</MenuItem>
                                    <MenuItem value='Times'>Times</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem>   
                                </Select>
                            </FormControl>
                            <TextField sx={{marginLeft:'1rem'}} value={habitTarget.value} onChange={(e:ChangeEvent<HTMLInputElement>)=> setHabitTargetValue(e)} id="habit-target" label={`${habitTarget.category} value*`}variant="outlined" />
                        </div>
                        <FormControl sx={{marginY:'2rem', minWidth: 180 }}>
                            <InputLabel id="habit-type-label">Habit Type*</InputLabel>
                            <Select
                            labelId="habit-type-label"
                            id="habit-type-select"
                            value={habitType}
                            label="Habit type"
                            onChange={(event:SelectChangeEvent<string>)=>setHabitType(event.target.value)}
                            >
                            <MenuItem value='positive'>Positive</MenuItem>
                            <MenuItem value="neutral">Neutral</MenuItem>
                            <MenuItem value='negative'>Negative</MenuItem>
                            </Select>
                        </FormControl>
                </Box>
                <Divider sx={{marginX:'2rem'}}/>
                <Box sx={{display:'flex',flexDirection:'column',width:'45%'}}>
                <FormControl sx={{  minWidth: 180 }}>
                        <InputLabel id="habit-category-label">Habit Category*</InputLabel>
                        <Select
                        labelId="habit-category-label"
                        id="habit-category-select"
                        value={habitCategory}
                        label="Habit category"
                        onChange={(event:SelectChangeEvent<string>)=>setHabitCategory(event.target.value)}
                        >
                        {habitCateogoryData.map((category:string,index:number) =>
                            <MenuItem key={index} value={category.split(' ').join('_').toLowerCase()}>{category}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <div style={{display:'flex', alignItems:'center'}}>  
                        <TargetType  targetType={habitTarget.category}  title={habitTarget.title} setTitle={(value:string) =>setHabitTarget({...habitTarget,title:value})} />
                        <DatePicker  value={dayjs(habitTargetDate) ? dayjs(habitTargetDate) : ''} onChange={changeDateHandler} sx={{marginY:'2rem',marginLeft:'1rem'}} label='Habit target date*'/>
                    </div>
                    <TextField onChange={(e:React.SyntheticEvent) => textFieldHandler(e,setLocalHabitTargetResults)} id="habit-expected-results" label="Habit expected results*" variant="outlined" />
                    <Button  onClick={habitTargetResultsHandler} sx={{height:'56px', marginTop:'2rem',width:'150px',border:'2px solid'}} variant="outlined">Add Result</Button>
                  
                </Box>
        </div>
    </div>
  )
}

export default AddHabitColumnOne