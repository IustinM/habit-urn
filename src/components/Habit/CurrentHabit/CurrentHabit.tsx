import { AssignmentTurnedIn, Close, Edit, EditCalendar, LocalFireDepartment, TrackChanges } from '@mui/icons-material'
import {  Box, Chip,IconButton,Typography } from '@mui/material'
import { getDate } from 'date-fns'
import { getMonth, getYear } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import { useDispatch, useSelector } from 'react-redux'
import { setShowCurrentHabit } from '../../../Slices/HabitSlice'
import { RootState } from '../../../store'
import EditHabit from '../EditHabit/EditHabit'
import Negative from './Negative'
import Positive from './Positive'

const CurrentHabit = () => {

    const dispatch = useDispatch();
    const habit = useSelector((state:RootState) => state.habit.habit);
    const [editMode,setEditMode] = useState<boolean>(false);

    const currentDate = {
        startDate: new Date(habit.habitDate.startDate),
        endDate: new Date(habit.habitDate.endDate),
        key: 'selection',
        color:'#1877fd54'
    }

    const progressDate = {
        startDate: new Date(habit.habitDate.startDate),
        endDate: new Date(getYear(new Date (habit.habitDate.startDate)),getMonth(new Date(habit.habitDate.startDate)),(getDate(new Date(habit.habitDate.startDate)) + habit.habitRange.current -1)),
        key: 'selection2',
        color:'#1877fd'
    }

    const returnChipColor = (type:string) => {
        switch(type){
            case 'Positive':
                return 'success';
            case 'Negative':
                return 'error'
            default :
                return 'default'
        }
    }

  return (
    <div style={{width:'28%',color:'#606060',paddingBottom:'2rem'}}>
            {editMode && <EditHabit habit={habit} setEditMode={setEditMode}/>}
            <div style={{borderBottom:'1px solid #a5a5a546'}}>
                <div style={{width:'85%',height:'63px', display:'flex' ,alignItems:'center',justifyContent:'space-between', marginLeft:'auto',marginRight:'auto'}}>
                    <div style={{display:'flex',alignItems:'center',width:'250px'}}>
                        <Typography variant='subtitle2' sx={{fontSize:'1.1rem',fontWeight:'bold'}} noWrap component='h2'>{habit.name}</Typography>
                        <Chip sx={{marginLeft:'1rem'}} label={habit.type} color={returnChipColor(habit.type)} />
                    </div>
                    <div style={{display:'flex'}}>
                        <IconButton onClick={() => setEditMode(true)} sx={{marginX:'0.2rem',background:'transparent',color:'#606060',border:'1px solid #a5a5a546',width:'30px',height:'30px', borderRadius:'0.2rem'}}><Edit sx={{fontSize:'17px'}}/></IconButton>
                        <IconButton onClick={()=> dispatch(setShowCurrentHabit(false))} sx={{marginX:'0.2rem',background:'transparent',color:'#606060',border:'1px solid #a5a5a546',width:'30px',height:'30px', borderRadius:'0.2rem'}}><Close sx={{fontSize:'17px'}}/></IconButton>
                    </div>
                </div>
            </div>
        <div style={{width:'85%',marginRight:'auto',marginLeft:'auto'}}>
            <Box sx={{display:'flex',width:'full',justifyContent:'space-between'}}>
                <div style={{display:'flex',padding:'10px',width:'48%',alignItems:'center',borderRadius:'0.5rem',marginTop:'2rem',flexWrap:'wrap', border:'1px solid #a5a5a546' }}>
                    <TrackChanges sx={{fontSize:'2rem', color:'red'}}/>
                    {habit.habitRange.current === habit.habitRange.total ?
                    <>
                      <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',marginLeft:'0.5rems'}} variant="inherit" component="p">Habit target: </Typography>
                      <Typography sx={{ fontSize:'14px',fontWeight:'bold',marginLeft:'0.3rem'}} variant="inherit" component="p">{habit.target.value}  / {habit.target.value} {habit.target.title}</Typography>
                    </>
                    :
                    <>
                        <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',marginLeft:'0.5rems'}} variant="inherit" component="p">Habit target: </Typography>
                        <Typography sx={{ fontSize:'14px',fontWeight:'bold',marginLeft:'0.3rem'}} variant="inherit" component="p">{habit.target.currentValue} / {habit.target.value} {habit.target.title}</Typography>
                    </>
                    }
                </div>
                <div style={{display:'flex',width:'48%',padding:'10px',alignItems:'center',borderRadius:'0.5rem',marginTop:'2rem',flexWrap:'wrap', border:'1px solid #a5a5a546' }}>
                    <LocalFireDepartment sx={{fontSize:'2rem', color:'red'}}/>
                    <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',marginLeft:'0.5rems'}} variant="inherit" component="p">Current steak: </Typography>
                    <Typography sx={{ fontSize:'14px',fontWeight:'bold',marginLeft:'0.3rem'}} variant="inherit" component="p">{habit.habitRange.current} / {habit.habitRange.total} days</Typography>
                </div>
            </Box>
            <div style={{marginTop:'1rem',marginBottom:'1rem' ,display:'flex',padding:'10px',borderRadius:'0.5rem',flexDirection:'column',border:'1px solid #a5a5a546'}}>
                <div style={{display:'flex'}}>
                    <AssignmentTurnedIn sx={{fontSize:'1.8rem', color:'#039dfc'}}/>
                    <Typography sx={{fontSize:'15px',marginLeft:'0.5rem',fontWeight:'semi-bold'}} variant="inherit" component="p">Habit expected result/s:</Typography>
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>

                    {habit.expectedResults && habit.expectedResults.map((result:any,index:number)=>
                        <Typography sx={{ fontSize:'14px' ,paddingLeft:'3px',fontWeight:'bold'}} variant="inherit" key={index} component="p">{index +1}. {result.text}</Typography>
                    )}
                </div>
            </div>
            <div style={{marginTop:'1rem',marginBottom:'1rem' ,display:'flex',flexDirection:'column',padding:'10px',borderRadius:'0.5rem',border:'1px solid #a5a5a546'}}>

                <div style={{display:'flex',alignItems:'center'}}>
                    <EditCalendar   sx={{fontSize:'1.7rem', color:'#fc9003'}}/>
                    <Typography sx={{fontSize:'15px',marginLeft:'0.5rem',fontWeight:'semi-bold'}} variant="inherit" component="p">Habit change deadline</Typography>
                </div>
           
                <Box sx={{mx:'auto'}} onMouseOver={(e:any) => {e.stopPropagation(); e.preventDefault(); return false}}>
                    <DateRange    showDateDisplay={false} editableDateInputs={true}  moveRangeOnFirstSelection={false}  ranges={habit.habitRange.current > 0 ? [currentDate,progressDate] : [currentDate]} onChange={(value:any)=>{}}/>
                </Box>
                
                {/* <DateCalendar  value={dayjs(habit.targetDate) ? dayjs(habit.targetDate) : ''} readOnly   sx={{marginTop:'0',paddingTop:'0',width:'100%'}}/> */}
            </div>
            {habit.type === 'Positive' ? 
            <Positive habit={habit}/> 
            :
            habit.type === 'Negative' ?
            <Negative habit={habit}/>
            :''
            }
            {/* <DatePicker label="Basic date picker" /> */}
        </div>
    </div>
  )
}

export default CurrentHabit