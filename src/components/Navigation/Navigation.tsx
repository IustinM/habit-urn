import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material'
import React, { useState } from 'react';
import { CoffeeOutlined, Feed } from '@mui/icons-material';

const Navigation = () => {
    const [username,setUsername] = useState('Iustin')
  return (
    <>
        <List  sx={
            {borderRight:'1px solid',
            minHeight:'100vh',
            background:'#b5b5b532',
            width:'20%',
            borderColor:'#b5b5b532'}}>
            <ListItemButton sx={{paddingY:'0.9rem',paddingX:'1rem', marginX:'1rem',marginY:'0.7rem',background:'#3888cf','&:hover':{background:'#0358ad'}, borderRadius:'0.5rem'}}>
                <ListItemAvatar sx={{marginX:'0',padding:0, minWidth:'48px'}}><Avatar sx={{marginX:'0rem'}}>{username[0]}</Avatar></ListItemAvatar>
                <ListItemText sx={{color:'white'}} primary={username}/>
            </ListItemButton>
            {/* <Divider/> */}
            <ListItemButton sx={{paddingY:'0.9rem',paddingX:'1rem', marginX:'1rem',marginY:'0.7rem', borderRadius:'0.5rem'}}>
                <ListItemIcon sx={{padding:0,margin:0,flex:0,minWidth:'30px'}}>< CoffeeOutlined/></ListItemIcon>
                <ListItemText primary='Habits'/>
            </ListItemButton>
            <ListItemButton sx={{paddingY:'0.9rem',paddingX:'1rem', marginX:'1rem',marginY:'0.7rem', borderRadius:'0.5rem'}}>
                <ListItemIcon sx={{padding:0,margin:0,flex:0,minWidth:'30px'}}>< Feed/></ListItemIcon>
                <ListItemText primary='Docs'/>
            </ListItemButton>
        </List>
    </>
  )
}

export default Navigation