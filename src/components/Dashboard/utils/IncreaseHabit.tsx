import { TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { setInputNumericValue } from '../../Habit/AddHabbit.tsx/utils/functions'

interface Props{
    value:number,
    setValue:React.Dispatch<React.SetStateAction<number >>,
    error?:boolean
}

const IncreaseHabit:React.FC<Props> = ({value,setValue,error}) => {
  return (
    <div onClick={(e:any) => e.stopPropagation()}>
        <TextField size='small' value={value || ''} error={error}  sx={{width:'100px'}} onChange={(e:ChangeEvent<HTMLInputElement>) => {setInputNumericValue(e.target.value,setValue)}} id="value-icrease" label="Value" variant="outlined" />
    </div>
  )
}

export default IncreaseHabit