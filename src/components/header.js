import React from 'react'
import { AppBar, Button, Typography, Toolbar, IconButton, Menu, MenuItem } from '@mui/material'
import { saveAs } from 'file-saver';
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

  const handleSave = () => {
    const element = document.getElementById('SVGwindow').querySelector('svg')
    const data = element.outerHTML
    //Take a little off the top ;)
    console.log(data)
    const lines = data.split('>')
    console.log(lines)
    const modifiedLines = lines.slice(4) //remove the first 3 lines
    modifiedLines.splice(modifiedLines.length-3,1) //remove the <g> ending wrapperS
    //Parse string for width and height
    const widthRegex = /width="(\d+)"/;
    const heightRegex = /height="(\d+)"/;
    console.log(modifiedLines[0])
    const widthMatch = modifiedLines[0].match(widthRegex)
    const heightMatch = modifiedLines[0].match(heightRegex)

    const width = widthMatch ? widthMatch[1] : null;
    const height = heightMatch ? heightMatch[1] : null;
    //append the new svg header
    const newSVG = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`, ...modifiedLines]
    const modifiedString = newSVG.join('>\n')
    console.log(modifiedString)
    const blob = new Blob([modifiedString], { type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'dotillismio.svg')
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
        <Button variant='contained' onClick={handleSave} startIcon={<SaveAltIcon/>}>
            Download SVG
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default PageHeader
