import { Add,  ArrowDropUp,  Search,ArrowDropDown, Sort, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Button,  InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import { ChangeEvent,  useState } from 'react'
import { useDispatch } from 'react-redux'
import { setViewAddHabitModal } from '../../Slices/ModalSlice'
import Habits from './Habits'

const HabitsDashboard = () => {
    const dispatch = useDispatch();
    const [search,setSearch] = useState<boolean>(false);
    const [sort,setSort] = useState<number>(0);
    const [searchValue,setSearchValue] = useState<string>('');

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
    
    
  return (
    <Box sx={{width:'50%', minHeight:'100vh',borderRight:'1px solid #a5a5a546'}}>
        <Toolbar sx={{borderBottom:'1px solid #a5a5a546',flex:'row',justifyContent:'space-between'}}>
            <Typography component='h2' variant='h6'>Habits</Typography>
            <Box sx={{padding:0}}>
                <TextField onChange={searchInputValue} InputProps={{endAdornment:(<InputAdornment position='end'><Search/></InputAdornment>)}} size='small'  variant='outlined'  sx={{marginRight:'1rem',color:'#606060', borderColor:' #a5a5a546'}}  label={'Search'}/>
                <Button onClick={setSortHandler} variant='outlined' sx={{marginRight:'1rem',color:sort === 0 ? '#606060' :'#277cf4',height:'40px', border:'1px solid #81818161'}} >
                  <div style={{width:'33px',height:'33px',position:'relative'}} ><ExpandLess sx={{position:'absolute', top:0,left:0,color:sort === 1 ?  '#277cf4':'#606060'}}/> <ExpandMore sx={{position:'absolute', bottom:0,left:0,color:sort === 2 ?  '#277cf4':'#606060'}} /></div>
                  Sort
                </Button>
                <Button variant='contained' sx={{height:'40px'}} startIcon={<Add/>} onClick={()=> dispatch(setViewAddHabitModal(true))}>Add habit</Button>
            </Box>
        </Toolbar>
        <Habits search={search} searchValue={searchValue} sort={sort}/>
    </Box>
  )
}

export default HabitsDashboard