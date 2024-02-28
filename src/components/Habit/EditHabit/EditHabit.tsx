import { AssignmentTurnedIn, Close } from '@mui/icons-material';
import { Button,    IconButton,  Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editHabitsState, setHabit } from '../../../Slices/HabitSlice';
import AddHabitColumnOne from '../AddHabbit.tsx/AddHabitColumnOne';
import AddHabitColumnTwo from '../AddHabbit.tsx/AddHabitColumnTwo';
import AddHabitPositive from '../AddHabbit.tsx/AddHabitPositive';
import HabitResult from '../AddHabbit.tsx/utils/HabitResult';
import { RootState } from '../../../store';
import TargetError from './utils/TargetError';


export interface basicHabitObject  {
    [property:string]:string
}

interface Props{
    habit:any,
    setEditMode:React.Dispatch<React.SetStateAction<boolean>>
}

const EditHabit:React.FC<Props> = ({habit,setEditMode}) => {

    const dispatch = useDispatch();
    const {habits} = useSelector((state:RootState) =>state.habit);
    const [habitName,setHabitName] = useState<string>('');
    const [habitType,setHabitType] = useState<string>('neutral');
    const [disableButton,setDisableButton] = useState<boolean>(false);
    const [targetError,setTargetError] = useState<boolean>(false);
    const [habitCategory,setHabitCategory] = useState<string>('');
    const [habitTarget,setHabitTarget] = useState<basicHabitObject>({category:'',title:'',value:'',currentValue:'0'});
    const [habitTargetDate,setHabitTargetDate] = useState<Date>(new Date());
    const [habitExpectedResults,setHabitExpectedResults] = useState<basicHabitObject[]>([]);
    const [identity,setIdentity] = useState<basicHabitObject>({name:'',type:''});
    const [actionSystem,setActionSystem] = useState<basicHabitObject>({
        hint:'',
        desire:'',
        reaction:'',
        reward:''
    });
    const [positiveMeasure,setPositiveMeasure] = useState<any>({
        percentage:0,
        habitValue:0,
        primaryFrequency:0,
        habitResult:0,
        habitExpectedResult:0,
        frequency:0
    });


    const editHabitHandler = () => {
        const habitsCopy = [...habits];
        const habitCopy = {
            id:habit.id,
            name:habitName,
            type:habitType,
            category:habitCategory,
            target:habitTarget,
            targetDate:habitTargetDate,
            expectedResults:habitExpectedResults,
            identity:identity,
            actionSystem:actionSystem
        }
        if(habitCopy.target.value < habitCopy.target.currentValue){
            setTargetError(true);
        }else{
            const newHabits = habitsCopy.map((habitLocal:any) => habitLocal.id === habitCopy.id ? habitCopy : habitLocal);
            dispatch(setHabit({...habitCopy}));
            dispatch(editHabitsState([...newHabits]))
            setEditMode(false);
        }
        
    }

    useEffect(() =>{
        console.log(habitName,habitType,habitCategory,habitExpectedResults)
        if(habitName.length > 0 && habitType.length > 0 && habitCategory.length > 0&&habitTargetDate && habitExpectedResults.length > 0){
            // setDisableButton(false)
       
        }else{
            
            // setDisableButton(true)
        }
    },[habitName,habitType,habitCategory,habitType,habitTargetDate,habitExpectedResults]);

    useEffect(()=>{
        setHabitName(habit.name);
        setHabitType(habit.type);
        setHabitCategory(habit.category)
        setHabitTarget({...habit.target});
        setHabitTargetDate(habit.targetDate);
        setHabitExpectedResults([...habit.expectedResults]);
        setIdentity(habit.identity);
        setActionSystem({...habit.actionSystem});
    },[]);
    
  return (
    <div  style={{position:'fixed',top:0,left:0,backdropFilter:'blur(3px)',color:'#606060',background:'rgba(52, 58, 65, 0.600000)',width:'100%',minHeight:'100vh',zIndex:'50',display:'flex',alignItems:'center',justifyContent:'center'}}>
        
        {targetError && <TargetError setTargetError={setTargetError} habitTarget={habitTarget} setHabitTarget={setHabitTarget}/>}
        <div style={{background:'white',borderRadius:'0.5rem',width:'70%',maxHeight:'80vh',paddingBottom:'2rem',overflowY:'scroll'}}>
            <div style={{display:'flex',justifyContent:'space-between',width:'85%',marginLeft:'auto',marginRight:'auto',paddingTop:'2rem',paddingBottom:'2rem'}}>
                <div className="">
                    <Typography variant='h4'  component='h4'>Edit habit</Typography>
                </div>
                <IconButton onClick={()=>setEditMode(false)} sx={{width:'50px',height:'50px'}}><Close/></IconButton>
            </div>
                <div style={{display:'flex',flexDirection:'column',width:'85%',marginLeft:'auto',marginRight:'auto'}}>
                    <AddHabitColumnOne 
                        habitName={habitName} setHabitName={setHabitName}
                        habitType={habitType} setHabitType={setHabitType}  
                        habitCategory={habitCategory} setHabitCategory={setHabitCategory}
                        habitTarget={habitTarget} setHabitTarget={setHabitTarget}
                        habitTargetDate={habitTargetDate} setHabitTargetDate={setHabitTargetDate}
                        habitExpectedResults={habitExpectedResults} setHabitExpectedResults={setHabitExpectedResults}
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
                        habitType === 'negative' &&
                    <AddHabitColumnTwo identity={identity} setIdentity={setIdentity} actionSystem={actionSystem} setActionSystem={setActionSystem}/>   
                    }
                    {
                        habitType === 'positive' &&
                        <AddHabitPositive positiveMeasure={positiveMeasure} setPositiveMeasure={setPositiveMeasure}/>
                    }
                    <Toolbar sx={{display:'flex',justifyContent:'center'}}>
                        <Button disabled={disableButton} onClick={editHabitHandler} sx={{height:'56px', marginTop:'2rem',width:'150px'}} variant='contained'>Edit habit</Button>
                    </Toolbar>
                </div>
        </div>
        </div>
    
  )

}

export default EditHabit