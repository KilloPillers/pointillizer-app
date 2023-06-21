import React, { useState } from "react"
import './menubar.css'
import RBush from 'rbush';
import { Paper, Box, Divider, Menu, MenuItem, Input, Button } from "@mui/material"
import PoissonSettings from './poissonsettings'
import FSSsettings from "./FSSsettings"
import APDSsettings from "./APDSsettings";
import GridSettings from "./GridSettings";
import ImageIcon from '@mui/icons-material/Image';
import GrainIcon from '@mui/icons-material/Grain';


function SettingsMenu({ script, settings, settingsSetter }) {
  switch (script){
    case "/poissonDiscSampling.worker.js":
      return <PoissonSettings settings={settings} settingsSetter={settingsSetter}></PoissonSettings>
    case "/FSS.worker.js":
      return <FSSsettings settings={settings} settingsSetter={settingsSetter}></FSSsettings>
    case "/APDS.worker.js":
      return <APDSsettings settings={settings} settingsSetter={settingsSetter}></APDSsettings>
    case "/Grid.worker.js":
      return <GridSettings settings={settings} settingsSetter={settingsSetter}></GridSettings>
    default:
      return <div>NO GENERATOR</div>
  }
}

function MenuBar({scriptSetter, settings, settingsSetter, imageProperties, imagePropertiesSetter, worker}) {
  const [script, setScript] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader  = new FileReader()
      reader.onload = (e) => {
        const image = new Image()
        
        image.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height

          const ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0)

          const imageData = ctx.getImageData(0,0,image.width, image.height)
          const pixelData = imageData.data

          let width = image.width
          let height = image.height
       
          let pixels = []
          for (let i = 0; i < pixelData.length; i+=4){
            const red = pixelData[i]
            const green = pixelData[i+1]
            const blue = pixelData[i+2]
            pixels.push([red, green, blue])
          }
          imagePropertiesSetter({width, height, pixels})
        }
        image.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelect = (eventKey) => {
    setAnchorEl(null)
    if (script !== eventKey){
      scriptSetter(eventKey)
      setScript(eventKey)
    }
  }

  return (
    <Box className="settings">
      <Paper className="settings-head">
        <Paper className="Title" sx={{margin:"10px", padding:"10px"}}>Settings</Paper>
        <Input
        type="file"
        onChange={handleImageUpload}
        sx={{ display: 'none' }} // Hide the input visually
      />
      <Button variant="contained" component="label" sx={{margin:"3px"}}>
        <ImageIcon/>
        Select Photo
        <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
      </Button>
        <Paper sx={{margin:"3px"}}>
          <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
            <GrainIcon/>
            Select Dot Generator
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={()=>handleSelect('/poissonDiscSampling.worker.js')}>Poisson Disc Sampling</MenuItem>
            <MenuItem onClick={()=>handleSelect('/APDS.worker.js')}>Adaptive Poisson Disc Sampling w/ Greyscale Density</MenuItem>
            <MenuItem onClick={()=>handleSelect('/FSS.worker.js')}>Fibonacci Sunflower Spiral</MenuItem>
            <MenuItem onClick={()=>handleSelect('/Grid.worker.js')}>Grid</MenuItem>
          </Menu>
        </Paper>
      </Paper>
      <Divider sx={{margin:"5px"}}/>
      <Paper className="generator-settings">
        {<SettingsMenu script={script} settings={settings} settingsSetter={settingsSetter} />}
      </Paper>
      <Divider sx={{margin:"5px"}}/>
      <Paper className="settings-footer">
        <Button variant="contained" sx={{margin:"5px"}} onClick={()=>{
          if (worker.current)
            worker.current.postMessage({...settings, ...imageProperties})
        }}>Start Generating</Button>
      </Paper>
    </Box>
  ) 
}

export default MenuBar
