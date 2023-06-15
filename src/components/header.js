import React from 'react'
import { AppBar, Button, Typography, Toolbar, IconButton, Menu, MenuItem } from '@mui/material'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import MenuIcon from '@mui/icons-material/Menu';
import './header.css'

const PageHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    console.log("test")
  }

  return (
    <AppBar className='header'>
      <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>About</MenuItem>
          <MenuItem onClick={handleClose}>Examples</MenuItem>
        </Menu>
        <Typography variant='h6' component="div" sx={{flexGrow:1, fontSize:30}}>Dotillism.io</Typography>
        <Button variant='contained' onClick={handleClick} startIcon={<SaveAltIcon/>}>
            Download SVG
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default PageHeader
