import { AssignmentTurnedIn, Close, Edit, EditCalendar, LocalFireDepartment, TrendingUp } from '@mui/icons-material'
import {  Chip,IconButton,Typography } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHabit } from '../../../Slices/HabitSlice'
import { RootState } from '../../../store'
import EditHabit from '../EditHabit/EditHabit'
import Negative from './Negative'
import Positive from './Positive'

const CurrentHabit = () => {
    const habit = useSelector((state:RootState) => state.habit.habit);
    const dispatch = useDispatch();
    const [editMode,setEditMode] = useState<boolean>(false);

    const returnChipColor = (type:string) => {
        switch(type){
            case 'positive':
                return 'success';
            case 'negative':
                return 'error'
            default :
                return 'default'
        }
    }
    console.log(habit)

  return (
    <div style={{width:'30%',color:'#606060',paddingBottom:'2rem'}}>
            {editMode && <EditHabit habit={habit} setEditMode={setEditMode}/>}
            <div style={{borderBottom:'1px solid #a5a5a546'}}>
                <div style={{width:'80%',height:'63px', display:'flex' ,alignItems:'center',justifyContent:'space-between', marginLeft:'auto',marginRight:'auto'}}>
                    <div style={{display:'flex',alignItems:'center',width:'250px'}}>
                        <Typography variant='subtitle2' sx={{fontSize:'1.1rem',fontWeight:'bold'}} noWrap component='h2'>{habit.name}</Typography>
                        <Chip sx={{marginLeft:'1rem'}} label={habit.type} color={returnChipColor(habit.type)} />
                    </div>
                    <div style={{display:'flex'}}>
                        <IconButton onClick={() => setEditMode(true)} sx={{marginX:'0.2rem',background:'transparent',color:'#606060',border:'1px solid #a5a5a546',width:'30px',height:'30px', borderRadius:'0.2rem'}}><Edit sx={{fontSize:'17px'}}/></IconButton>
                        <IconButton onClick={()=> dispatch(setHabit(null))} sx={{marginX:'0.2rem',background:'transparent',color:'#606060',border:'1px solid #a5a5a546',width:'30px',height:'30px', borderRadius:'0.2rem'}}><Close sx={{fontSize:'17px'}}/></IconButton>
                    </div>
                </div>
            </div>
        <div style={{width:'80%',marginRight:'auto',marginLeft:'auto'}}>
            <div style={{display:'flex',padding:'10px',alignItems:'center',borderRadius:'0.5rem',marginTop:'2rem',flexWrap:'wrap', border:'1px solid #a5a5a546' }}>
                <LocalFireDepartment sx={{fontSize:'2rem', color:'red'}}/>
                <Typography sx={{fontSize:'15px',fontWeight:'semi-bold',marginLeft:'0.5rems'}} variant="inherit" component="p">Habit target: </Typography>
                <Typography sx={{ fontSize:'14px',fontWeight:'bold',marginLeft:'0.3rem'}} variant="inherit" component="p">{habit.target.currentValue} / {habit.target.value} {habit.target.title}</Typography>
            </div>
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
                <DateCalendar  value={dayjs(habit.targetDate) ? dayjs(habit.targetDate) : ''} readOnly   sx={{marginTop:'0',paddingTop:'0',width:'100%'}}/>
            </div>
            {habit.type === 'positive' ? 
            <Positive habit={habit}/> 
            :
            habit.type === 'negative' ?
            <Negative habit={habit}/>
            :''
            }
            {/* <DatePicker label="Basic date picker" /> */}
        </div>
    </div>
  )
}

export default CurrentHabit