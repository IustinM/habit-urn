import { Check, Close, Delete, Edit } from '@mui/icons-material';
import { IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

interface basicHabitObject  {
    [property:string]:string
}

interface Props{
    result:string,
    id:string,
    state:basicHabitObject[],
    setState:React.Dispatch<React.SetStateAction<basicHabitObject[]>>,
}

const HabitResult:React.FC<Props> = ({result,id,setState,state}) => {


  const [localTarget,setLocalTarget]= useState<string>(result);
  const [editMode,setEditMode] = useState<boolean>(false);
 
  const editHandler = () => {
    const localArray =  [];
    for(let i = 0;i<state.length;i++){
        if(id === state[i].id){
            localArray.push({id:id,text:localTarget});
        }else{
            localArray.push(state[i]);
        }
    }
    setEditMode(false)
    setState(localArray);
  }

  const deleteHandler = () =>{
    const localArray =  [];
    for(let i = 0;i<state.length;i++){
        if(id !== state[i].id){
            localArray.push(state[i]);
        }
    }
    setState(localArray);


  }

  return (
    <div>
        {!editMode ?
        <div style={{border:'1px solid #60606080',marginTop:'1rem',display:'flex',alignItems:'center',justifyContent:'space-between',paddingLeft:'1rem',paddingRight:'1rem', height:'56px',borderRadius:'0.3rem'}}>
            <Typography sx={{fontSize:'0.9rem'}} variant='h6' component='h2'>{result}</Typography>
            <div style={{display:'flex'}}>
                <IconButton onClick={() => setEditMode(true)}>
                    <Edit color='success' />
                </IconButton>
                <IconButton onClick={deleteHandler}>
                    <Delete color='error'/>
                </IconButton>
            </div>
        </div>
        :
        <div style={{marginTop:'1rem',display:'flex',alignItems:'center',justifyContent:'space-between', height:'56px',borderRadius:'0.3rem',position:'relative'}}>
             <TextField value={localTarget} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setLocalTarget(e.target.value)} sx={{width:'100%',paddingRight:'112px'}} id="habit-target-edit" label="Edit habit target" variant="outlined" />
             <IconButton onClick={()=>setEditMode(false)} sx={{position:'absolute',width:'56px',height:'57px',borderRadius:'0 0.3rem 0.3rem 0rem',background:'#cf0202','&:hover':{background:'#cf0202'},right:'3px'}}>
                    <Close sx={{color:'white'}} />
            </IconButton>
             <IconButton onClick={editHandler} sx={{position:'absolute',width:'56px',height:'57px',borderRadius:'0',background:'#2b911d','&:hover':{background:'#2b911d'},right:'59px'}}>
                    <Check sx={{color:'white'}} />
            </IconButton>
        </div>
    }
    </div>
  )
}

export default HabitResult