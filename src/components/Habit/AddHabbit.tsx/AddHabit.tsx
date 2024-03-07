import { AssignmentTurnedIn, Close, InfoTwoTone } from '@mui/icons-material';
import { Button,    IconButton,  Toolbar, Typography } from '@mui/material'
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../../../Slices/HabitSlice';
import { setViewAddHabitModal } from '../../../Slices/ModalSlice';
import AddHabitColumnOne from './AddHabitColumnOne';
import AddHabitColumnTwo from './AddHabitColumnTwo';
import AddHabitPositive from './AddHabitPositive';
import HabitResult from './utils/HabitResult';
import { getDate } from 'date-fns';
import { basicHabitObject, DateRange, PositiveMeasure } from '../../utils/types';




const AddHabit = () => {

    const dispatch = useDispatch();

    const [habitName,setHabitName] = useState<string>('');
    const [habitType,setHabitType] = useState<string>('Neutral');
    const [disableButton,setDisableButton] = useState<boolean>(false);
    const [habitCategory,setHabitCategory] = useState<string>('');
    const [habitTarget,setHabitTarget] = useState<basicHabitObject>({category:'Times',title:'',value:'',currentValue:'0'});
    const [habitExpectedResults,setHabitExpectedResults] = useState<basicHabitObject[]>([]);
    const [habitPlace,setHabitPlace] = useState<string>('');
    const [identity,setIdentity] = useState<basicHabitObject>({name:'',type:''});
    const [actionSystem,setActionSystem] = useState<basicHabitObject>({
        hint:'',
        desire:'',
        reaction:'',
        reward:''
    });
    const [positiveMeasure,setPositiveMeasure] = useState<PositiveMeasure>({
        percentage:0,
        habitValue:0,
        habitResult:0,
        habitExpectedResult:0,
    }); 
    const [selectionRange,setSelectionRange] = useState<DateRange>({
        startDate: new Date(new Date().setHours(0,0,0,0)),
        endDate: new Date(new Date().setHours(0,0,0,0)),
        key: 'selection',
    });

    const addHabitHandler = () =>{
     
        const habit = {
            id:uuid(),
            name:habitName,
            type:habitType,
            category:habitCategory,
            target:habitTarget,
            habitDate:{
                startDate:selectionRange.startDate.toDateString(),
                endDate:selectionRange.endDate.toDateString(),
                key: 'selection'},
            currentDate:selectionRange.startDate.toDateString(),
            expectedResults:habitExpectedResults,
            identity:identity,
            actionSystem:actionSystem,
            positiveMeasure:positiveMeasure,
            place:habitPlace,
            habitRange:{
                current:0,
                total:((getDate(selectionRange.endDate)) - getDate(selectionRange.startDate) )+1
            }
        }
        dispatch(setHabits(habit))
        dispatch(setViewAddHabitModal(false));
        
    }

  
    useEffect(() =>{
        switch(habitType){
            case 'Positive':{
                if(habitPlace.length > 0 &&positiveMeasure.habitResult >0){
                    if(habitName.length > 0 
                        && habitType.length > 0 
                        && habitCategory.length > 0 
                        && habitExpectedResults.length > 0 
                        && habitTarget.value.length > 0){
                            setDisableButton(false);
                            break;
                            
                        }else{
                            setDisableButton(true);
                            break;
                        }
                    }else{
                    setDisableButton(true);
                    break;
                }
            }
            case 'Negative':{
                if(actionSystem.hint.length > 0 && actionSystem.desire.length> 0 && actionSystem.reaction.length > 0 && actionSystem.reward.length > 0 && identity.name.length > 0 && identity.type.length > 0){
                    if(habitName.length > 0 
                        && habitType.length > 0 
                        && habitCategory.length > 0 
                        && habitExpectedResults.length > 0 
                        && habitTarget.value.length > 0){
                            setDisableButton(false);
                            break;
                            
                        }else{
                            setDisableButton(true);
                            break;
                        }
                    }else{
                    setDisableButton(true);
                    break;
                }
            }
            default:{
                if(habitName.length > 0 
                    && habitType.length > 0 
                    && habitCategory.length > 0 
                    && habitExpectedResults.length > 0 
                    && habitTarget.value.length > 0){
                        setDisableButton(false);
                        break;
                        
                    }else{
                        setDisableButton(true);
                        break;
                    }
            }
        }
       

       
    },[habitName,habitType,habitCategory,,habitTarget,habitPlace,habitType,habitExpectedResults,positiveMeasure,actionSystem,identity]);
    
  return (
    <div style={{position:'fixed',top:0,backdropFilter:'blur(3px)',color:'#606060',background:'rgba(52, 58, 65, 0.600000)',width:'100%',minHeight:'100vh',zIndex:'50',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{background:'white',borderRadius:'0.5rem',width:'70%',maxHeight:'85vh',paddingBottom:'2rem',overflowY:'scroll'}}>
            <div style={{display:'flex',justifyContent:'space-between',width:'85%',marginLeft:'auto',marginRight:'auto',paddingTop:'2rem',paddingBottom:'2rem'}}>
                <div className="">
                    <Typography variant='h4'  component='h4'>Add habit</Typography>
                </div>
                <IconButton onClick={()=>dispatch(setViewAddHabitModal(false))} sx={{width:'50px',height:'50px'}}><Close/></IconButton>
            </div>
                <div style={{display:'flex',flexDirection:'column',width:'85%',marginLeft:'auto',marginRight:'auto'}}>
                    <AddHabitColumnOne 
                        habitName={habitName} setHabitName={setHabitName}
                        habitType={habitType} setHabitType={setHabitType}  
                        habitCategory={habitCategory} setHabitCategory={setHabitCategory}
                        habitTarget={habitTarget} setHabitTarget={setHabitTarget}
                        habitExpectedResults={habitExpectedResults} setHabitExpectedResults={setHabitExpectedResults}
                        selectionRange={selectionRange}
                        setSelectionRange={setSelectionRange}
                    />
                   

                    {habitExpectedResults.length > 0 &&
                    <>
                      <div style={{display:'flex',width:'',alignItems:'center',marginTop:'1rem'}}>
                        <AssignmentTurnedIn sx={{fontSize:'1.4rem', color:'#039dfc'}}/>
                        <Typography sx={{fontSize:'13px',marginLeft:'0.5rem',fontWeight:'semi-bold'}} variant="inherit" component="p">Habit expected result/s:</Typography>
                    </div>
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'2rem'}}>
                        <div style={{width:'45%'}} >
                            {habitExpectedResults.map((result:basicHabitObject,index:number)=> index % 2 === 0 && <HabitResult key={index} state={habitExpectedResults} setState={setHabitExpectedResults} result={result.text} id={result.id}/>)}
                        </div>
                        <div style={{width:'45%'}}>
                            {habitExpectedResults.map((result:basicHabitObject,index:number)=> index % 2 === 1 && <HabitResult key={index} state={habitExpectedResults} setState={setHabitExpectedResults} result={result.text} id={result.id}/>)}
                        </div>
                    </div>
                    </>
                    }
                    {
                        habitType === 'Negative' &&
                    <AddHabitColumnTwo identity={identity} setIdentity={setIdentity} actionSystem={actionSystem} setActionSystem={setActionSystem}/>   
                    }
                    {
                        habitType === 'Positive' &&
                        <AddHabitPositive setHabitPlace={setHabitPlace} habitPlace={habitPlace} positiveMeasure={positiveMeasure} setPositiveMeasure={setPositiveMeasure}/>
                    }
                    <Toolbar sx={{display:'flex',justifyContent:'center'}}>
                        <Button disabled={disableButton} onClick={addHabitHandler} sx={{height:'56px', marginTop:'2rem',width:'150px'}} variant='contained'>Add habit</Button>
                    </Toolbar>
                </div>
        </div>
        </div>
    
  )

}

export default AddHabit