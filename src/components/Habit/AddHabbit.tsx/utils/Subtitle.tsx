import { InfoTwoTone } from "@mui/icons-material"
import { IconButton, Popover, Typography } from "@mui/material"
import React from "react";
import { v4 as uuid } from "uuid";

const SubTitle:React.FC<{text:string,bold?:boolean,blue?:boolean}> = ({text,bold,blue}) =>{
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
   
    
    return(
        <div style={{display:'flex',marginTop:'1rem',marginBottom:'0.5rem',alignItems:'center'}}>
            <Popover
                id={uuid()}
                sx={{width:'80vw'}}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
            }}>
                <Typography sx={{ p: 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a interdum felis. Aliquam suscipit laoreet ex et fermentum. Morbi et mauris malesuada, tincidunt nibh et, cursus turpis. Ut quis sapien enim. Cras vulputate a arcu id luctus. Praesent placerat ex dolor, a feugiat erat congue at. Suspendisse vel tincidunt dolor. Phasellus posuere venenatis lobortis. Mauris rutrum turpis vulputate placerat facilisis. Fusce vehicula pellentesque nunc, in maximus augue feugiat sed. Fusce efficitur ornare lectus, id tincidunt nisi ultrices vel. Integer a ullamcorper neque, vel tempor ligula. Proin eleifend ex a lectus eleifend pharetra.</Typography>
            </Popover>
        <Typography variant='subtitle1' sx={{fontWeight:bold ? 'bold' :'semi-bold'}} component='h4'>{text}</Typography>
        <IconButton sx={{width:'50px', height:'50px',marginLeft:'0.5rem'}} onClick={handleClick}>
            <InfoTwoTone sx={{fontSize:'1.7rem', color:blue ? '#039dfc': 'red',cursor:'pointer'}}/>
        </IconButton>
        </div>
    )
}

export default SubTitle