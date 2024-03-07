import { Add,  ArrowDropUp,  Search,ArrowDropDown, Sort, ExpandLess, ExpandMore, CalendarMonth } from '@mui/icons-material'
import { Box, Button,  InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import { getDate, getMonth } from 'date-fns'
import { ChangeEvent,  useEffect,  useRef,  useState } from 'react'
import { Calendar } from 'react-date-range'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDate } from '../../Slices/HabitSlice'
import { setViewAddHabitModal } from '../../Slices/ModalSlice'
import { RootState } from '../../store'
import { monthsOfYear } from '../utils/DateData'
import Habits from './Habits';


const HabitsDashboard = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector((state:RootState) => state.habit.currentDate)
    const [search,setSearch] = useState<boolean>(false);
    const [sort,setSort] = useState<number>(0);
    const [searchValue,setSearchValue] = useState<string>('');
    const [showCalendar,setShowCalendar] = useState<boolean>(false)
    const boxRef = useRef<HTMLButtonElement>(null)
    
    const searchInputValue = (e:ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      if(searchValue.length > 0){
        setSearch(true)
      }else{
        setSearch(false)
      }
    }

    const setSortHandler = () =>{
      if(sort <2){
        setSort(sort +1);
      }else{
        setSort(0)
      }
    }
   
    const handleClickOutside = (event:any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
  
    useEffect(() => {
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []); 
  
    
    
  return (
    <Box  sx={{width:'54%', minHeight:'100vh',minWidth:'700px',borderRight:'1px solid #a5a5a546'}}>
        <Toolbar sx={{borderBottom:'1px solid #a5a5a546',flex:'row',justifyContent:'space-between'}}>
            <Typography component='h2' variant='h6'>Habits</Typography>
            <Box onClick={(e:any)=>{ e.stopPropagation(); }}   sx={{padding:0,display:'flex'}}>
                <Box ref={boxRef} onClick={() => setShowCalendar(!showCalendar)} sx={{marginRight:'1rem',borderRadius:'0.3rem',cursor:'pointer',px:'0.5rem',color:'#277cf4',justifyContent:'space-between',position:'relative',width:'125px',height:'40px',fontSize:'0.8rem', display:'flex',alignItems:'center',border:'1px solid #277cf4'}} >
                  <CalendarMonth/>
                  <Box sx={{display:'flex'}}>
                    <span style={{marginLeft:'0.5rem', marginRight:'0.2rem'}}>{getDate(new Date(currentDate))} </span>
                    <span >{monthsOfYear[getMonth(new Date(currentDate))]}</span>
                    {showCalendar &&<Box onClick={(e:any)=>{ e.stopPropagation();}}  sx={{position:'absolute',bgcolor:'#ffffff',bottom:'0%',border:'1px solid black',borderRadius:'0.5rem', overflow:'hidden',left:'50%',transform:'translateX(-50%) translateY(101%)',zIndex:'70'}}>
                        <Calendar date={new Date(currentDate)} showDateDisplay={false} editableDateInputs={true}  onChange={(value:any)=>{dispatch(setCurrentDate(value.toDateString()))}}/>
                      </Box>}
                  </Box>
                </Box>
                <TextField onChange={searchInputValue} InputProps={{endAdornment:(<InputAdornment position='end'><Search/></InputAdornment>)}} size='small'  variant='outlined'  sx={{marginRight:'1rem',width:'150px',color:'#606060', borderColor:' #a5a5a546'}}  label={'Search'}/>
                <Button onClick={setSortHandler} variant='outlined' sx={{marginRight:'1rem',color:sort === 0 ? '#606060' :'#277cf4',height:'40px', border:'1px solid #81818161'}} >
                  <div style={{width:'33px',height:'33px',position:'relative'}} ><ExpandLess sx={{position:'absolute', top:0,left:0,color:sort === 1 ?  '#277cf4':'#606060'}}/> <ExpandMore sx={{position:'absolute', bottom:0,left:0,color:sort === 2 ?  '#277cf4':'#606060'}} /></div>
                  Sort
                </Button>
                <Button variant='contained' sx={{height:'40px'}} startIcon={<Add/>} onClick={()=> dispatch(setViewAddHabitModal(true))}>Add habit</Button>
            </Box>
        </Toolbar>
        <Habits search={search} searchValue={searchValue} setShowCalendar = {setShowCalendar} sort={sort}/>
    </Box>
  )
}

export default HabitsDashboard