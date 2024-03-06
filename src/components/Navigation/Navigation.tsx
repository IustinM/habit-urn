import { Avatar,List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material'
import { useState } from 'react';
import { CoffeeOutlined, Feed } from '@mui/icons-material';
import icon from '../../img/logo.png';

const Navigation = () => {

    const [username,setUsername] = useState('guest')

  return (
    <>
        <List  sx={
            {borderRight:'1px solid',
            minHeight:'100vh',
            background:'#b5b5b532',
            width:'18%',
            borderColor:'#b5b5b532'}}>
            <ListItem sx={{paddingY:'0.9rem',display:'flex',paddingX:'1rem',marginX:'1rem',marginY:'0.7rem', borderRadius:'0.5rem'}}>
               <img style={{width:'50px', marginRight:'1rem',height:'50px'}} src={icon} alt='icon'/>
                <ListItemText sx={{background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,48,121,1) 25%, rgba(0,127,255,1) 100%)',display:'inline-block',backgroundClip:'text',color:'transparent'}} primary={'HabiTurn'}/>
            </ListItem>
        
            {/* <Divider/> */}
            <ListItemButton sx={{paddingY:'0.9rem',paddingX:'1rem', marginX:'1rem',marginY:'0.7rem', borderRadius:'0.5rem'}}>
                <ListItemIcon sx={{padding:0,margin:0,flex:0,minWidth:'30px'}}>< CoffeeOutlined/></ListItemIcon>
                <ListItemText primary='Habits'/>
            </ListItemButton>
            {/* <ListItemButton sx={{paddingY:'0.9rem',paddingX:'1rem', marginX:'1rem',marginY:'0.7rem', borderRadius:'0.5rem'}}>
                <ListItemIcon sx={{padding:0,margin:0,flex:0,minWidth:'30px'}}>< Feed/></ListItemIcon>
                <ListItemText primary='Docs'/>
            </ListItemButton> */}
            <ListItemButton sx={{paddingY:'0.9rem',paddingX:'1rem',marginX:'1rem',marginY:'0.7rem',background:'#b5b5b532','&:hover':{background:''}, borderRadius:'0.5rem'}}>
                <ListItemAvatar sx={{marginX:'0',padding:0, minWidth:'48px'}}><Avatar sx={{marginX:'0rem',bgcolor:"black"}}>{username[0]}</Avatar></ListItemAvatar>
                <ListItemText sx={{}} primary={username}/>
            </ListItemButton>
        </List>
    </>
  )
}

export default Navigation