import { Box, Button,  TextField, Typography } from '@mui/material'
import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import { PositiveMeasure } from '../../utils/types';
import ErrorText from './utils/ErrorText';
import { checkNumber } from './utils/functions';
import SubTitle from './utils/Subtitle'

interface Props {
    positiveMeasure:PositiveMeasure,
    setPositiveMeasure:React.Dispatch<SetStateAction<PositiveMeasure>>,
    setHabitPlace:React.Dispatch<React.SetStateAction<string>>,
    habitPlace:string
}
const AddHabitPositive:React.FC<Props> = ({positiveMeasure,setPositiveMeasure,setHabitPlace,habitPlace}) => {

    const [percentage,setPercentage] = useState<string>('');
    const [habitValue,setHabitValue] = useState<string>('');
    const [habitResult,setHabitResult] = useState<number>(0);
    const [habitExpectedResult,setHabitExpectedResult] = useState<string>('');
    const [error,setError] = useState<boolean>(false);

    const multiplyValues = (value:number,result:number,percentage:number) =>{
        //view the value added with the percentage
        const percentageValue =value + (value * percentage)/100;
        //view how much it adds if you increase the habit value
        const resultValue = (percentageValue * result)/value;
        return parseFloat(resultValue.toFixed(2));
    }

    const resetValuesHandler = () =>{
        setPercentage('')
        setHabitValue('')
        setHabitResult(0)
        setHabitExpectedResult('')
    }

    const setHabitResultHandler = () =>{

        if(checkNumber(habitValue) && checkNumber(percentage)&& checkNumber(habitExpectedResult)){
            setError(false)

            setHabitResult(multiplyValues(parseFloat(habitValue),parseFloat(habitExpectedResult),parseInt(percentage)));
        }else{
            setError(true)
        }
    }

    useEffect(()=>{
        setPositiveMeasure({
            percentage:parseFloat(percentage),
            habitValue:parseFloat(habitValue),
            habitResult:habitResult,
            habitExpectedResult:parseFloat(habitExpectedResult),
        })
    },[habitValue,percentage,habitResult,habitExpectedResult]);

    useEffect(() => {
        setPercentage(`${positiveMeasure.percentage}`)
        setHabitValue(`${positiveMeasure.habitValue}`);
        setHabitResult(positiveMeasure.habitResult);
        setHabitExpectedResult(`${positiveMeasure.habitExpectedResult}`);
    },[])
    
  return (
    <div>
        {error &&  <ErrorText text='Please only add numeric values'/>}
        <SubTitle text='Add a place where engaging in your habit becomes more enjoyable' popupText={'The specific location where we perform our daily activities can significantly impact the formation and enhancement of our habits. This concept is based on the theory that our surroundings can subtly yet powerfully influence our behavior. For example, if we want to adopt the habit of reading more, choosing a dedicated and comfortable space for reading can facilitate this habit. Adequate lighting, a comfy chair, and the absence of distractions create an environment conducive to reading, making it more likely to engage in this activity regularly'} blue bold/>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <TextField type='text' value={habitPlace || ''} sx={{width:'45%'}} onChange={(e:ChangeEvent<HTMLInputElement>)=> setHabitPlace(e.target.value)} id="place_for_habit" label="Place" variant="outlined" />
        </Box>
        <SubTitle text='Add a measurable numeric value of this habit' popupText='The value is standardly defined per month, that is, for example, a value of 30 km run, in a month, will produce a result of 5 kg lost' blue bold/>
            <Box sx={{display:'flex',marginBottom:'2rem',justifyContent:'space-between'}}>
                <TextField value={habitValue || ''}  onChange={(e:ChangeEvent<HTMLInputElement>)=> setHabitValue(e.target.value) } sx={{width:'45%'}} id="Numeric_habit_target" label="Habit value" variant="outlined" />
                <TextField value={habitExpectedResult || ''} onChange={(e:ChangeEvent<HTMLInputElement>)=> setHabitExpectedResult(e.target.value)} sx={{width:'45%'}} id="Numeric_expected_Result" label="Result value" variant="outlined" />
            </Box>
            <SubTitle text='Add a measurable percentage to view how much your result will increase' popupText='Visualizing a result after improving a habit will increase the probability that that improvement will be achieved.' blue bold/>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <TextField type='text' value={percentage || ''} sx={{width:'45%'}} onChange={(e:ChangeEvent<HTMLInputElement>)=> setPercentage(e.target.value)} id="Numeric_habit_percentage" label="Percentage value" variant="outlined" />
                <Box  sx={{width:'45%', height:'56px',borderRadius:'0.3rem',display:'flex',alignItems:'center',paddingX:'0.7rem',border:'1px solid #6b6b6b7e'}}>
                    <Typography component={'h2'} variant={'subtitle1'}>{habitResult > 0 && habitResult}</Typography>
                </Box>
            </Box>
            <Button onClick={setHabitResultHandler} sx={{height:'56px', marginTop:'2rem',width:'150px',border:'2px solid'}} variant="outlined">Set Result</Button>
            <Button onClick={resetValuesHandler} sx={{height:'56px', marginTop:'2rem',marginLeft:'2rem',width:'150px',border:'2px solid'}} variant="outlined">Reset Values</Button>
    </div>
  )
}

export default AddHabitPositive