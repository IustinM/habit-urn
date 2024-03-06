import { TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { checkNumber, setInputNumericValue } from '../../Habit/AddHabbit.tsx/utils/functions'

interface Props{
    value:number,
    setValue:React.Dispatch<React.SetStateAction<number >>,
    error?:boolean
}

const IncreaseHabit:React.FC<Props> = ({value,setValue,error}) => {

  const setIncreasedTarget = (e:ChangeEvent<HTMLInputElement>) => {

    if(e.target.value.length === 0){
        setValue(0)
    }
    if(checkNumber(e.target.value )|| e.target.value.length === 0 ){
        if(parseFloat(e.target.value) > 0)
        setValue(parseFloat(e.target.value));   
    }
}

  return (
    <div onClick={(e:any) => e.stopPropagation()}>
        <TextField size='small' value={value || ''} error={error}  sx={{width:'100px'}} onChange={(e:ChangeEvent<HTMLInputElement>) => {setIncreasedTarget(e)}} id="value-icrease" label="Value" variant="outlined" />
    </div>
  )
}

export default IncreaseHabit