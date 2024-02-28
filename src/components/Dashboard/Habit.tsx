import { Add, Delete, Edit,  MoreVert,} from '@mui/icons-material'
import { Box, Button, CircularProgress, Divider, IconButton, Popover, Toolbar, Typography } from '@mui/material'
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { resetHabits, setHabit,  } from '../../Slices/HabitSlice'
import { RootState } from '../../store'
import IncreaseHabit from './utils/IncreaseHabit'
import React from 'react';
import { setEditMode } from '../../Slices/ModalSlice';
import { returnBackground, returnColor, returnIcon } from './utils/functions';
import DeleteModal from './utils/DeleteModal';
import EditHabit from '../Habit/EditHabit/EditHabit';


interface Props{
    habit:any
}

const Habit:React.FC<Props> = ({habit}) => {
    
    //dispatch and selectors -->
    const habits = useSelector((state:RootState)=>state.habit.habits);
    const dispatch = useDispatch();
    //<-- dispatch and selectors 

    //local state -->
    const [increasedTarget,setIncreasedTarget] = useState<number>(0);
    const [error,setError] = useState<boolean>(false);
    const [editMode,setEditMode] = useState<boolean>(false);
    const [viewDelete,setViewDelete] = useState<boolean>(false)
    const [showAdd,setShowAdd] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
        e.stopPropagation();
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
    }

    //this handler submits the new increased value
    const submitNewValue = () => {
     
        const increaseValue = increasedTarget;
        const currentValue = parseInt(habit.target.currentValue);
        const totalValue = parseInt(habit.target.value)
        if(increaseValue + currentValue > totalValue){
            setError(true);
        }else{
            setIncreasedTarget(0);
            const localHabits = [...habits];
            let localHabit = localHabits.find(localHabit => localHabit.id === habit.id);
            const newHabit = {...localHabit,target:{...localHabit.target,currentValue:`${increaseValue + currentValue}`}};
            const newHabits = localHabits.map((filterHabit:any) => filterHabit.id === newHabit.id ? newHabit : filterHabit);
            setError(false)
            dispatch(resetHabits(newHabits));
        }
        
    }
    //<-- handlers
    

  return (
    <Box onClick={()=> dispatch(setHabit(habit))} sx={{ display:'flex',cursor:'pointer',justifyContent:'space-between','&:hover':{background:'#b5b5b523'},transition:'0.2s all',paddingTop:'0.5rem',color:'#606060',paddingBottom:'0.5rem',alignItems:'center',borderBottom:'1px solid #a5a5a546'}}>
        {viewDelete && <DeleteModal setViewDelete={setViewDelete} habit={habit}/>}
        {editMode && <EditHabit habit={habit} setEditMode={setEditMode}/>}
        <Toolbar>
            <IconButton sx={{display:'flex',color:returnColor(habit.category),marginRight:'0.5rem',justifyContent:'center',position:'relative' ,'&:hover':{backgroundColor:returnBackground(habit.category)},backgroundColor:returnBackground(habit.category),alignItems:'centers', width:'45px', height:'45px'}}>
                <CircularProgress sx={{position:'absolute',top:0,right:0,minWidth:'45px',color:returnColor(habit.category), minHeight:'45px'}} variant="determinate" value={(habit.target.currentValue * 100)/habit.target.value} />
                {returnIcon(habit.category)}
            </IconButton>
            <Box >
                <Typography component={'p'} variant={'caption'}>{habit.name}</Typography>
                <Typography component={'p'} variant={'caption'}>{habit.target.currentValue} / {habit.target.value} {habit.target.title}</Typography>
            </Box>
        </Toolbar>
        <Box sx={{display:'flex',alignItems:'center',height:'50px'}}>
            {showAdd &&<IncreaseHabit  value={increasedTarget} error={error} setValue={setIncreasedTarget}/>}
            <Button variant='outlined' onClick={(e:any) =>showAddHandler(e)} sx={{marginRight:'1rem',marginLeft:'1rem',color:'#606060',minHeight:'40px', border:'1px solid #a5a5a546'}} startIcon={<Add/>}>Add</Button>
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

