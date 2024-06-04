import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import { AppBar, 
  SpeedDial, 
  SpeedDialAction, 
  Typography, 
  Toolbar, 
  IconButton, 
  Menu, 
  MenuItem,
} from '@mui/material'
import { saveAs } from 'file-saver';
import MenuIcon from '@mui/icons-material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import './header.css'

const actions = [
  { icon: <ImageIcon />, name: 'PNG' },
  { icon: <DescriptionIcon />, name: 'SVG' },
];

const PageHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleSpeedDialOpen = () => setOpen(true);

  const handleSpeedDialClose = (type) => {
    setOpen(false);
    switch (type) {
      case 'SVG':
        handleSaveSVG()
        break;
      case 'PNG':
        handleSavePNG()
        break;
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExamples = () => {
    navigate('/Examples')
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAbout = () => {
    navigate('/About')
    setAnchorEl(null);
  };

  const handleSavePNG = () => {
    const element = document.getElementById('SVGwindow').querySelector('svg')
    const data = element.outerHTML
    //Remove svg header
    const lines = data.split('>')
    const modifiedLines = lines.slice(4) //remove the first 3 lines
    modifiedLines.splice(modifiedLines.length-3,1) //remove the <g> ending wrappers
    modifiedLines.pop() //remove the last <svg> ending wrapper
    //Parse string for width and height
    const widthRegex = /width="(\d+)"/;
    const heightRegex = /height="(\d+)"/;
    const widthMatch = modifiedLines[0].match(widthRegex)
    const heightMatch = modifiedLines[0].match(heightRegex)

    const width = widthMatch ? widthMatch[1] : null;
    const height = heightMatch ? heightMatch[1] : null;
    //append the new svg header
    const newSVG = ["\n<!-- This SVG was made using dotillism.io --",
      ...modifiedLines]
    const svgString = newSVG.join('>\n')

    // Create SVG element
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width); // Set width in pixels
    svg.setAttribute("height", height); // Set height in pixels
    svg.innerHTML = svgString;

    // Create a new image element
    var img = new Image();

    // Serialize SVG to string
    var serializer = new XMLSerializer();
    var svgStringSerialized = serializer.serializeToString(svg);

    // Set SVG string as the source for the image
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStringSerialized);

    img.onload = function (svgwidth, svgheight) {
      return function () {
        // Create canvas
        var canvas = document.createElement("canvas");
    
        // Set canvas size
        canvas.width = svgwidth;
        canvas.height = svgheight;
    
        // Get 2D context
        var ctx = canvas.getContext("2d");
    
        // Clear canvas
        ctx.clearRect(0, 0, svgwidth, svgheight);
    
        ctx.drawImage(img, 0, 0, svgwidth, svgheight);
    
        // Convert canvas to PNG data URL
        var dataURL = canvas.toDataURL("image/png");
    
        // Create a temporary link element
        var downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = "dotillismio.png";
    
        // Simulate a click on the link to trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
    }(width, height); 
  }

  const handleSaveSVG = () => {
    const element = document.getElementById('SVGwindow').querySelector('svg')
    const data = element.outerHTML
    //Remove svg header
    const lines = data.split('>')
    const modifiedLines = lines.slice(4) //remove the first 3 lines
    modifiedLines.splice(modifiedLines.length-3,1) //remove the <g> ending wrapperS
    //Parse string for width and height
    const widthRegex = /width="(\d+)"/;
    const heightRegex = /height="(\d+)"/;
    const widthMatch = modifiedLines[0].match(widthRegex)
    const heightMatch = modifiedLines[0].match(heightRegex)

    const width = widthMatch ? widthMatch[1] : null;
    const height = heightMatch ? heightMatch[1] : null;
    //append the new svg header
    const newSVG = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`,
    "<!-- This SVG was made using dotillism.io --",
      ...modifiedLines]
    const modifiedString = newSVG.join('>\n')
    const blob = new Blob([modifiedString], { type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'dotillismio.svg')
  }

  return (
    <AppBar className='header'>
      <Toolbar>
        {/*
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
        */}
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
          <MenuItem onClick={handleAbout}>About</MenuItem>
          <MenuItem onClick={handleExamples}>Examples</MenuItem>
        </Menu>
        <Typography variant='h6' component="div" sx={{flexGrow:1, fontSize:30}}>Dotillism.io</Typography>
        <SpeedDial
        ariaLabel="Save Image As"
        sx={{ position: 'fixed', top: 3, right: 10}}
        icon={<SaveAsIcon/>}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        direction='down'
        open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={(event) => handleSpeedDialClose(action.name)}
            />
          ))}
        </SpeedDial>
      </Toolbar>
    </AppBar>
  )
}

export default PageHeader
