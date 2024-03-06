import { ThemeProvider } from '@emotion/react';
import { CssBaseline,createTheme, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import HabitsDashboard from './components/Dashboard/HabitsDashboard';
import AddHabit from './components/Habit/AddHabbit.tsx/AddHabit';
import CurrentHabit from './components/Habit/CurrentHabit/CurrentHabit';
import Navigation from './components/Navigation/Navigation';
import { RootState } from './store';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
const theme = createTheme()

function App() {
  const {viewAddHabitModal} = useSelector((state:RootState) => state.modal);
  const showCurrentHabit = useSelector((state:RootState) => state.habit.showCurrentHabit)


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {viewAddHabitModal &&  <AddHabit/> }
        <Box sx={{display:'flex',borderColor:'#a5a5a546'}} >
          <Navigation/>
          <HabitsDashboard/>
          {showCurrentHabit ?<CurrentHabit/> :''}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
