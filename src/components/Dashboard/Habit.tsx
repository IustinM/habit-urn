import { Add, Delete, Done, Edit, HourglassTop,  MoreVert,} from '@mui/icons-material'
import { Box, Button, CircularProgress, Divider, IconButton, Popover, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { resetHabits, setHabit, setShowCurrentHabit } from '../../Slices/HabitSlice'
import { RootState } from '../../store'
import IncreaseHabit from './utils/IncreaseHabit'
import React from 'react';
import { returnBackground, returnColor, returnIcon } from './utils/functions';
import DeleteModal from './utils/DeleteModal';
import EditHabit from '../Habit/EditHabit/EditHabit';
import { getMonth, getYear } from 'date-fns';
import { Habit as habitType } from '../utils/types';

interface Props{
    habit:habitType
}

const Habit:React.FC<Props> = ({habit}) => {
    

    console.log(habit)
    //dispatch and selectors -->
    const {habits,currentDate} = useSelector((state:RootState)=>state.habit);
    const dispatch = useDispatch();
    //<-- dispatch and selectors 

    //local state -->
    const [increasedTarget,setIncreasedTarget] = useState<number>(0);
    const [error,setError] = useState<boolean>(false);
    const [editMode,setEditMode] = useState<boolean>(false);
    const [viewDelete,setViewDelete] = useState<boolean>(false)
    const [showAdd,setShowAdd] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [completed,setCompleted] = useState<boolean>(false);
    //<-- local state
  
    //popover functions -->
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    //<-- popover functions 
    
    //handlers -->
    //this handler shows the input that increase the habit value
    const showAddHandler = (e:any) => {
        // e.stopPropagation();
        if(!showAdd){
            setShowAdd(true);
        }else{
            if(showAdd && increasedTarget > 0){
                submitNewValue()
            }else{
                setError(false);
                setShowAdd(false)
                
            }
        }
    }

    const editHandler = (e:any) => {
        e.stopPropagation();
        handleClose()
        setEditMode(true);
    }
    const deleteHandler = (e:any) => {
        e.stopPropagation();
        handleClose()
        setViewDelete(true);
        // dispatch(setShowCurrentHabit(false))
    }

    //this handler submits the new increased value
    const submitNewValue = () => {
     
        const increaseValue = increasedTarget;
        const currentValue = parseInt(habit.target.currentValue);
        const totalValue = parseInt(habit.target.value);

        if(increaseValue + currentValue > totalValue){
            setError(true);
        }else{
            setIncreasedTarget(0);
            const localHabits = [...habits];
            let localHabit = localHabits.find(localHabit => localHabit.id === habit.id);
            if(increaseValue + currentValue === parseFloat(localHabit!.target.value)){
                const newHabit = {...localHabit,currentDate:new Date(getYear(new Date(habit.currentDate)),getMonth(new Date(habit.currentDate)),(new Date(habit.currentDate).getDate() + 1)).toDateString(),habitRange:{...localHabit!.habitRange,current:localHabit!.habitRange.current +1 <= localHabit!.habitRange.total ? localHabit!.habitRange.current +1 : localHabit!.habitRange.current},target:{...localHabit!.target,currentValue:`0`}};
                const newHabits = localHabits.map((filterHabit:any) => filterHabit.id === newHabit.id ? newHabit : filterHabit);
                dispatch(resetHabits(newHabits));   
            }else{
                
                const newHabit = {...localHabit,target:{...localHabit!.target,currentValue:`${increaseValue + currentValue}`}};
                const newHabits = localHabits.map((filterHabit:any) => filterHabit.id === newHabit.id ? newHabit : filterHabit);
                dispatch(resetHabits(newHabits)); 
            }
            setError(false)
        }
    }

    useEffect(() => {
        if(habit.habitRange.current === habit.habitRange.total){
            setCompleted(true);
        }
    }, [habit,habits,currentDate])
    useEffect(() => {
        dispatch(setHabit(habit));
    }, [habits,currentDate])
    //<-- handlers    
    // useEffect(() =>{`

    // },[habits])
    console.log(habit.name,habit.currentDate);
    // console.log((new Date(habit.habitDate.startDate)).getTime() < (new Date(habit.currentDate)).getTime() && (new Date(currentDate)).getTime() < (new Date(habit.currentDate)).getTime() && (new Date(habit.habitDate.startDate)).getTime() <= (new Date(currentDate)).getTime())

  return (
    <Box onClick={()=>{dispatch(setHabit(habit));  dispatch(setShowCurrentHabit(true))}} sx={{ display:'flex',cursor:'pointer',justifyContent:'space-between','&:hover':{background:completed ? 'white' :'#b5b5b523'},transition:'0.2s all',paddingTop:'0.5rem',color:'#606060',paddingBottom:'0.5rem',alignItems:'center',borderBottom:'1px solid #a5a5a546'}}>
        {viewDelete && <DeleteModal setViewDelete={setViewDelete} habit={habit}/>}
        {editMode && <EditHabit habit={habit} setEditMode={setEditMode}/>}
        <Toolbar>
            <IconButton sx={{display:'flex',color:returnColor(habit.category),marginRight:'0.5rem',justifyContent:'center',position:'relative' ,'&:hover':{backgroundColor:returnBackground(habit.category)},backgroundColor:returnBackground(habit.category),alignItems:'centers', width:'45px', height:'45px'}}>
                { new Date(habit.habitDate.startDate).getTime() < new Date(habit.currentDate).getTime() && new Date(currentDate).getTime() < new Date(habit.currentDate).getTime() && new Date(habit.habitDate.startDate).getTime() <= new Date(currentDate).getTime()  ?
                <CircularProgress sx={{position:'absolute',top:0,right:0,minWidth:'45px',color:returnColor(habit.category), minHeight:'45px'}} variant="determinate" value={100} />
                :
                <CircularProgress sx={{position:'absolute',top:0,right:0,minWidth:'45px',color:returnColor(habit.category), transition:'0.2s all',minHeight:'45px'}} variant="determinate" value={(parseFloat(habit.target.currentValue) * 100)/parseFloat(habit.target.value)} />}
                {returnIcon(habit.category)}
            </IconButton>
            <Box >
                {
                (new Date(habit.habitDate.startDate)).getTime() < (new Date(habit.currentDate)).getTime() && (new Date(currentDate)).getTime() < (new Date(habit.currentDate)).getTime() && (new Date(habit.habitDate.startDate)).getTime() <= (new Date(currentDate)).getTime()
                 ?
                <>
                <Typography component={'h2'} variant={'caption'}>{habit.name}</Typography>
                <Typography component={'h2'} variant={'caption'}>{habit.target.value} / {habit.target.value}  {habit.target.title}</Typography>
                </>
                :<>
                                <Typography component={'h2'} variant={'caption'}>{habit.name}</Typography>
                <Typography component={'h2'} variant={'caption'}>{habit.target.currentValue} / {habit.target.value} {habit.target.title}</Typography>
                </>   
                }
                
            </Box>
        </Toolbar>
        <Box sx={{display:'flex',alignItems:'center',height:'50px'}}>
            {
                new Date(habit.currentDate).getTime() === new Date(currentDate).getTime() ?
                <>
                {showAdd &&<IncreaseHabit  value={increasedTarget} error={error} setValue={setIncreasedTarget}/>}
                <Button variant='outlined' onClick={(e:any) =>showAddHandler(e)} sx={{marginRight:'1rem',marginLeft:'1rem',color:'#606060',minHeight:'40px', border:'1px solid #a5a5a546'}} startIcon={<Add/>}>Add</Button>
                </>
                :
                new Date(habit.habitDate.startDate).getTime() < new Date(habit.currentDate).getTime() && new Date(currentDate).getTime() < new Date(habit.currentDate).getTime() && new Date(habit.habitDate.startDate).getTime() <= new Date(currentDate).getTime() ?
                <Typography  sx={{marginRight:'1rem', border:'1px solid #00973a',color:'#00973a', height:'40px', borderRadius:'0.3rem',px:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center'}} variant='subtitle1' component='h4'>
                    <Done/>
                    Completed
                </Typography>
                :
                <Typography  sx={{marginRight:'1rem', border:'1px solid #973f00',color:'#973f00', height:'40px', borderRadius:'0.3rem',px:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center'}} variant='subtitle1' component='h4'>
                    <HourglassTop/>
                     Waiting for progress
                </Typography>
            }
            <IconButton onClick={(e:any) =>handleClick(e)} sx={{color:'#606060',marginRight:'1rem', border:'1px solid #a5a5a546', height:'40px' ,width:'40px' ,borderRadius:'0.3rem'}}>
                <MoreVert/>
            </IconButton>
            <Popover
                id={uuid()}
                sx={{marginTop:'0.2rem',boxShadow:'none'}}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                <Box sx={{width:'130px',height:'120px',display:'flex',border:'1px solid #a5a5a546',borderRadius:'0.2rem' ,boxShadow:'none', flexDirection:'column',justifyContent:'center', alignContent:'center'}}>
                    <Button  onClick={editHandler} sx={{color:'#606060',minHeight:'59px',width:'100%'}} startIcon={<Edit/>}>Edit</Button>
                    <Divider/>
                    <Button onClick={deleteHandler}  sx={{color:'#606060',minHeight:'59px',width:'100%'}} startIcon={<Delete/>}>Delete</Button>
                </Box>
            </Popover>
        </Box>
    </Box>
  )
}

export default Habit

