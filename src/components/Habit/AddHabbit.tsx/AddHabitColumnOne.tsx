import { Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Divider, SelectChangeEvent } from '@mui/material'
import { v4 as uuid } from 'uuid';
import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import TargetType from './utils/TargetType';
import { basicHabitObject, DateRange as DateRangeType } from '../../utils/types';
import {  DateRange } from 'react-date-range'
import { checkNumber } from './utils/functions';
import { habitCateogoryData } from './utils/data';

interface Props{
    habitName:string,
    setHabitName:React.Dispatch<React.SetStateAction<string>>,
    habitType:string,
    setHabitType:React.Dispatch<React.SetStateAction<string>>,
    habitCategory:string,
    setHabitCategory:React.Dispatch<React.SetStateAction<string>>,
    habitTarget:basicHabitObject,
    setHabitTarget:React.Dispatch<React.SetStateAction<basicHabitObject>>,
    habitExpectedResults:basicHabitObject[],
    setHabitExpectedResults:React.Dispatch<React.SetStateAction<basicHabitObject[]>>,
    selectionRange:DateRangeType,
    setSelectionRange:React.Dispatch<SetStateAction<DateRangeType>>
}

const AddHabitColumnOne:React.FC<Props> = ({habitName,setHabitName,habitType,setHabitType,habitCategory,setHabitCategory,habitTarget,setHabitTarget,habitExpectedResults,setHabitExpectedResults,selectionRange,setSelectionRange}) => {
    
    //local state -->
    const [localHabitTargetResults,setLocalHabitTargetResults] = useState<string>('');
    const [showCalendar,setShowCalendar] = useState<boolean>(false)
    //<-- local state 

    const boxRef = useRef<HTMLButtonElement>(null);

    //handlers -->
   
    const habitTargetResultsHandler = ():void =>{
        if(localHabitTargetResults.length > 0){
            setLocalHabitTargetResults('')
            setHabitExpectedResults([...habitExpectedResults,{id:uuid(),text:localHabitTargetResults}])
        }
    }

    const setHabitTargetValue = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length === 0){
            setHabitTarget({...habitTarget,value:''})
        }
        if(checkNumber(e.target.value )|| e.target.value.length === 0 ){
            if(parseFloat(e.target.value) > 0)
            setHabitTarget({...habitTarget,value:parseFloat(e.target.value).toString()});   
        }
    }

  

    const handleClickOutside = (event:any) => {
        if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
        }
    };
    //<-- handlers

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); 

    
    useEffect(()=>{
       
        if(habitTarget.category  === 'Times'){
            setHabitTarget({...habitTarget,title:'times'})
            
        }else{
            setHabitTarget({...habitTarget,title:''})
        }
    },[habitTarget.category])

  
    return (
    <div >
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Typography variant='h6' sx={{marginBottom:'1rem'}} component='h4'>Basic habit details</Typography>
        <Box sx={{display:'flex',flexDirection:'column'}}></Box>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{display:'flex',flexDirection:'column',width:'45%'}} >
                    <TextField value={habitName || ''} id="habit-name" label="Habit name*" variant="outlined" onChange={(e:ChangeEvent<HTMLInputElement>)=> setHabitName(e.target.value)} />
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
                            <MenuItem value='Positive'>Positive</MenuItem>
                            <MenuItem value="Neutral">Neutral</MenuItem>
                            <MenuItem value='Negative'>Negative</MenuItem>
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
                    <Box sx={{display:'flex',justifyContent:"space-between",my:'2rem', alignItems:'center'}}>  
                        <TargetType  targetType={habitTarget.category}  title={habitTarget.title} setTitle={(value:string) =>setHabitTarget({...habitTarget,title:value})} />
                        {/* <Calendar  value={dayjs(habitTargetDate) ? dayjs(habitTargetDate) : ''} onChange={changeDateHandler} sx={{marginY:'2rem',marginLeft:'1rem'}} label='Habit target date*'/> */}
                    <Box ref={boxRef} onClick={() => setShowCalendar(!showCalendar)} sx={{ height:'56px',width:'60%',ml:'1rem',position:'relative',borderRadius:'0.3rem',display:'flex',alignItems:'center',paddingX:'0.7rem',border:'1px solid #6b6b6b7e'}}>
                        <Typography component={'h2'} variant={'subtitle1'}>{selectionRange.startDate.toLocaleString().split(',')[0]}/{selectionRange.endDate.toLocaleString().split(',')[0]}</Typography>
                        {showCalendar &&<Box onClick={(e:any)=> e.stopPropagation()}  sx={{position:'absolute',bgcolor:'#ffffff',bottom:'0%',border:'1px solid black',borderRadius:'0.5rem', overflow:'hidden',transform:'translateX(-50%) translateY(101%)',zIndex:'50'}}>
                            <DateRange color='#ffffff' showDateDisplay={false} editableDateInputs={true}  moveRangeOnFirstSelection={false}  ranges={[selectionRange]} onChange={(value:any)=>{setSelectionRange({...value.selection})}}/>
                        </Box>}
                    </Box>
                    </Box>
                    <TextField value={localHabitTargetResults || ''} onChange={(e:ChangeEvent<HTMLInputElement>) =>setLocalHabitTargetResults(e.target.value)} id="habit-expected-results" label="Habit expected results*" variant="outlined" />
                    <Button  onClick={habitTargetResultsHandler} sx={{height:'56px', marginTop:'2rem',width:'150px',border:'2px solid'}} variant="outlined">Add Result</Button>
                </Box>
        </div>
    </div>
  )
}

export default AddHabitColumnOne