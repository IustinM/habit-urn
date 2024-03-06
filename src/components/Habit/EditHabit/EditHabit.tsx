import { AssignmentTurnedIn, Close } from '@mui/icons-material';
import { Box, Button,    IconButton,  Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editHabitsState, setHabit, setShowCurrentHabit } from '../../../Slices/HabitSlice';
import AddHabitColumnOne from '../AddHabbit.tsx/AddHabitColumnOne';
import AddHabitColumnTwo from '../AddHabbit.tsx/AddHabitColumnTwo';
import AddHabitPositive from '../AddHabbit.tsx/AddHabitPositive';
import HabitResult from '../AddHabbit.tsx/utils/HabitResult';
import { RootState } from '../../../store';
import { getDate } from 'date-fns';
import { DateRange, Habit, habitRange, PositiveMeasure } from '../../utils/types';


export interface basicHabitObject  {
    [property:string]:string
}

interface Props{
    habit:Habit,
    setEditMode:React.Dispatch<React.SetStateAction<boolean>>
}

const EditHabit:React.FC<Props> = ({habit,setEditMode}) => {

    const dispatch = useDispatch();
    const {habits} = useSelector((state:RootState) =>state.habit);
    const [habitName,setHabitName] = useState<string>('');
    const [habitType,setHabitType] = useState<string>('Neutral');
    const [disableButton,setDisableButton] = useState<boolean>(false);
    const [targetError,setTargetError] = useState<boolean>(false);
    const [habitCategory,setHabitCategory] = useState<string>('');
    const [habitTarget,setHabitTarget] = useState<basicHabitObject>({category:'',title:'',value:'',currentValue:'0'});
    const [initialTarget,setInitialTarget] = useState<basicHabitObject>({category:'',title:'',value:'',currentValue:'0'});
    const [habitExpectedResults,setHabitExpectedResults] = useState<basicHabitObject[]>([]);
    const [identity,setIdentity] = useState<basicHabitObject>({name:'',type:''});
    const [habitRange,setHabitRange] = useState<habitRange>({current:0,total:0})
    const [habitPlace,setHabitPlace] = useState<string>('');
    const [ currentDate,setCurrentDate] = useState<Date>(new Date(new Date().setHours(0,0,0,0)));
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

    const [initialRange,setInitialRange] = useState<DateRange>({
        startDate: new Date(new Date().setHours(0,0,0,0)),
          endDate: new Date(new Date().setHours(0,0,0,0)),
          key: 'selection',
    });


    const editHabitHandler = () => {
        const habitsCopy = [...habits];
        let copyCurrentDate = currentDate;
        if(selectionRange.startDate.getTime() !==  new Date(habit.habitDate.startDate).getTime()){
            copyCurrentDate = selectionRange.startDate;
        }
        if((getDate(selectionRange.endDate) - getDate(selectionRange.startDate) < habit.habitRange.current)){
            setHabitRange({...habitRange,current:0})
        }
        const habitCopy = {
            id:habit.id,
            name:habitName,
            type:habitType,
            category:habitCategory,
            target:habitTarget,
            habitDate:{
                startDate:selectionRange.startDate.toDateString(),
                endDate:selectionRange.endDate.toDateString(),
                key: 'selection'},
            currentDate:copyCurrentDate.toDateString(),
            expectedResults:habitExpectedResults,
            identity:identity,
            habitRange:{...habitRange},
            actionSystem:actionSystem,
            positiveMeasure:positiveMeasure,
            place:habitPlace
        }
        if(habitCopy.target.value < habitCopy.target.currentValue || habitCopy.target.value !== initialTarget.value){
            setTargetError(true);
        }else{
            const newHabits = habitsCopy.map((habitLocal:Habit) => habitLocal.id === habitCopy.id ? habitCopy : habitLocal);
            dispatch(setHabit({...habitCopy}));
            dispatch(editHabitsState([...newHabits]))
            setEditMode(false);
            // setTargetError(false);
            dispatch(setShowCurrentHabit(false))
        }
        
    }

    const editHabit = () => {
         if(selectionRange.startDate.getTime() !== initialRange.startDate.getTime() || selectionRange.endDate.getTime() !== initialRange.endDate.getTime()){
            setTargetError(true);
            
        }else{
            editHabitHandler();
        }
    }

    useEffect(() =>{
       
        if(habitName.length > 0 && habitType.length > 0 && habitCategory.length > 0 && habitExpectedResults.length > 0){
            // setDisableButton(false)
       
        }

       
    },[habitName,habitType,habitCategory,habitType,habitExpectedResults]);

    const resetHabit = () =>  {
        setHabitTarget({...habitTarget,currentValue:'0'})
        setHabitRange({ total:((getDate(new Date(selectionRange.endDate)) - getDate(new Date(selectionRange.startDate)) ))+1,current:0});
        setInitialRange({...selectionRange})
        setInitialTarget(habitTarget);
        setCurrentDate(selectionRange.startDate);
        editHabitHandler();
        // setTargetError(false);
        // setEditMode(false)
        
    }

    useEffect(()=>{
        setHabitName(habit.name);
        setHabitType(habit.type);
        setHabitCategory(habit.category)
        setHabitTarget({...habit.target});
        setInitialTarget({...habit.target})
        setHabitExpectedResults([...habit.expectedResults]);
        setCurrentDate(new Date(habit.currentDate))
        setIdentity(habit.identity);
        setActionSystem({...habit.actionSystem});
        setHabitRange({...habit.habitRange})
        setSelectionRange({
            startDate: new Date(habit.habitDate.startDate),
            endDate: new Date(habit.habitDate.endDate),
            key: 'selection'
        })
        setInitialRange({
            startDate: new Date(habit.habitDate.startDate),
            endDate: new Date(habit.habitDate.endDate),
            key: 'selection',
        })
        setPositiveMeasure({...habit.positiveMeasure})
        setHabitPlace(habit.place)
    },[]);

  return (
    <div  style={{position:'fixed',top:0,left:0,backdropFilter:'blur(3px)',color:'#606060',background:'rgba(52, 58, 65, 0.600000)',width:'100%',minHeight:'100vh',zIndex:'50',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {targetError &&   <div style={{position:'fixed',top:0,left:0,backdropFilter:'blur(3px)',color:'#606060',background:'rgba(52, 58, 65, 0.600000)',width:'100%',minHeight:'100vh',zIndex:'50',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Box style={{background:'white',borderRadius:'0.5rem',width:'400px',display:'flex',flexDirection:"column", alignItems:'center',justifyContent:'center',minHeight:'200px',overflowY:'scroll'}}>
            <Typography variant='subtitle1' sx={{textAlign:'center',marginBottom:'1rem'}} component='h6'>By changing this value it will result <br/> in resetting your current target progress.</Typography>
            <Toolbar sx={{display:'flex',width:'70%', marginLeft:'auto',marginRight:'auto', justifyContent:'space-around'}}>
                <Button onClick={resetHabit}  variant='contained' >Change</Button>
                <Button variant='contained' onClick={() => setTargetError(false)} sx={{background:'#c30d0d','&:hover':{background:'#c30d0d'}}}>Cancel</Button>
            </Toolbar>
        </Box>
    </div>}
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
                        <AddHabitPositive habitPlace={habitPlace} setHabitPlace={setHabitPlace} positiveMeasure={positiveMeasure} setPositiveMeasure={setPositiveMeasure}/>
                    }
                    <Toolbar sx={{display:'flex',justifyContent:'center'}}>
                        <Button disabled={disableButton} onClick={editHabit} sx={{height:'56px', marginTop:'2rem',width:'150px'}} variant='contained'>Edit habit</Button>
                    </Toolbar>
                </div>
        </div>
        </div>
    
  )

}

export default EditHabit