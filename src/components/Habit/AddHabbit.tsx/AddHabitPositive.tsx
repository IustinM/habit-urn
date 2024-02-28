import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { setInputNumericValue } from './utils/functions';
import SubTitle from './utils/Subtitle'

interface Props {
    positiveMeasure:any,
    setPositiveMeasure:any,
}
const AddHabitPositive:React.FC<Props> = ({positiveMeasure,setPositiveMeasure}) => {

    const [percentage,setPercentage] = useState<number>(0);
    const [habitValue,setHabitValue] = useState<number>(0);
    const [habitValue2,setHabitValue2] = useState<string>('');
    const [primaryFrequency,setPrimaryFrequency] = useState<number>(0)
    const [habitResult,setHabitResult] = useState<number>(0);
    const [habitExpectedResult,setHabitExpectedResult] = useState<number>(0)
    const [frequency,setFrequency] = useState<number>(1);

    const multiplyValues = (value:number,frequency:number,result:number,percentage:number) =>{
        //view  the value times the number of days,weeks, or month
        const multipliedValue= value * frequency;
        //view the value added with the percentage
        const percentageValue =multipliedValue + (multipliedValue * percentage)/100;
        //view how much it adds if you increase the habit value
        const resultValue = (percentageValue * result)/multipliedValue;
        
        return resultValue;
    }

    const resetValuesHandler = () =>{
        setPercentage(0)
        setHabitValue(0)
        setPrimaryFrequency(0)
        setHabitResult(0)
        setHabitExpectedResult(0)
        setFrequency(1)
    }
    
    const refactorValueAfterFrequency = () =>{

        const multipliedValue= habitValue * primaryFrequency;
        const newMultipliedValue = habitValue * frequency;


        const resultValue =  (newMultipliedValue * habitExpectedResult)/multipliedValue;
        console.log(primaryFrequency,frequency)
        if(primaryFrequency < frequency){
            console.log(resultValue + habitExpectedResult)
        }else{
            console.log('here')
            console.log(resultValue,habitExpectedResult)
            console.log(resultValue - habitExpectedResult)
        }
    }

    const setHabitResultHandler = () =>{

        setPrimaryFrequency(frequency);
        setHabitResult(multiplyValues(habitValue,frequency,habitExpectedResult,percentage));
    }

    useEffect(()=>{
        if(primaryFrequency > 0){
            refactorValueAfterFrequency()
        }

        setPositiveMeasure({
            percentage:percentage,
            habitValue:habitValue,
            primaryFrequency:primaryFrequency,
            habitResult:habitResult,
            habitExpectedResult:habitExpectedResult,
            frequency:frequency
        })
    },[habitValue,frequency,percentage,habitResult,habitExpectedResult,primaryFrequency])
    

  return (
    <div>
        <SubTitle text='Add a measurable numeric value of this habit' blue bold/>
            <div style={{display:'flex',marginBottom:'2rem'}}>
                <TextField value={positiveMeasure.habitValue || ''} onChange={(e:ChangeEvent<HTMLInputElement>)=> setInputNumericValue(e.target.value,setHabitValue) } sx={{width:'40%'}} id="Numeric_habit_target" label="Habit value" variant="outlined" />
                    <FormControl sx={{ width:'15%', marginLeft:'2rem', marginRight:'2rem'}}>
                        <InputLabel id="how-often-select-label">How often</InputLabel>
                        <Select
                        labelId="how-often-select-label"
                        id="how-often-select-id"
                        value={frequency}
                        label="How often"
                        onChange={(e:any) => setFrequency(e.target.value)} 
                        >
                            <MenuItem value={30}>Daily</MenuItem>
                            <MenuItem value={4}>Weekly</MenuItem>
                            <MenuItem value={1}>Monthly</MenuItem>
                        </Select>
                    </FormControl>
                <TextField value={habitExpectedResult || ''} onChange={(e:ChangeEvent<HTMLInputElement>)=> setInputNumericValue(e.target.value,setHabitExpectedResult)} sx={{width:'40%'}} id="Numeric_expected_Result" label="Result value" variant="outlined" />
            </div>
            <SubTitle text='Add a measurable percentage to view how much your result will increase' blue bold/>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <TextField type='text' value={percentage || ''} sx={{width:'45%'}} onChange={(e:ChangeEvent<HTMLInputElement>)=> setInputNumericValue(e.target.value,setPercentage,true)} id="Numeric_habit_percentage" label="Percentage value" variant="outlined" />
                <Box  sx={{width:'45%', height:'56px',borderRadius:'0.3rem',display:'flex',alignItems:'center',paddingX:'0.7rem',border:'1px solid #6b6b6b7e'}}>
                    <Typography component={'h2'} variant={'subtitle1'}>{habitResult > 0 && habitResult}</Typography>
                </Box>
            </div>
            <Button onClick={setHabitResultHandler} sx={{height:'56px', marginTop:'2rem',width:'150px',border:'2px solid'}} variant="outlined">View Result</Button>
            <Button onClick={resetValuesHandler} sx={{height:'56px', marginTop:'2rem',marginLeft:'2rem',width:'150px',border:'2px solid'}} variant="outlined">Reset Values</Button>
    </div>
  )
}

export default AddHabitPositive