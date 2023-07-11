import React, { useState } from "react"
import './menubar.css'
import './Home.css'
import { Paper, Box, Divider, Menu, MenuItem, Button, Input } from "@mui/material"
import PoissonSettings from './poissonsettings'
import FSSsettings from "./FSSsettings"
import APDSsettings from "./APDSsettings";
import GridSettings from "./GridSettings";
import ImageIcon from '@mui/icons-material/Image';
import GrainIcon from '@mui/icons-material/Grain';
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';
import Looks3RoundedIcon from '@mui/icons-material/Looks3Rounded';

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
      return <div style={{height:"200px", display:"flex", justifyContent:"center", alignItems: "center"}}>NO GENERATOR</div>
  }
}

function MenuBar({className, scriptSetter, settings, settingsSetter, imageProperties, imagePropertiesSetter, worker}) {
  const [script, setScript] = useState("")
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageUrl, setImageUrl] = useState('')
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
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
          setImageUrl(reader.result);
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
    <Box className={className}>
      <Paper className="settings-head">
        <>{isMobile ? (<></>):
        (
        <Paper className="Title" sx={{margin:"10px", padding:"10px"}}>Settings</Paper>
        )}
        </>
        <div className="settings-head-body">
          <div className="settings-header-interactables">
            <div>
              <LooksOneRoundedIcon/>
              <Button variant="contained" component="label" sx={{margin:"3px"}}>
                <ImageIcon/>
                Select Photo
                <Input type="file" sx={{ display: 'none' }} onChange={handleImageUpload} />
              </Button>
            </div>
            <div>
              <LooksTwoRoundedIcon/>
              <Button
              id="basic-button"
              variant="contained"
              sx={{marginBottom:'3px'}}
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
            </div>
          </div>
          <Divider sx={{marginLeft: '3px'}} variant="middle" orientation="vertical" flexItem/>
          <Paper elevation={2} sx={{ display: 'flex', flex: 1, margin: '3px', justifyContent: 'center', alignItems:'center'}}>
            {imageUrl && <img src={imageUrl} alt="Loaded Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
          </Paper>
        </div>
      </Paper>
      <Divider sx={{margin:"5px"}}/>
      <Paper className="generator-settings">
        {<SettingsMenu script={script} settings={settings} settingsSetter={settingsSetter} />}
      </Paper>
      <Divider sx={{margin:"5px"}}/>
      <Paper className="settings-footer" sx={{display:'flex', alignItems:'flex-start', justifyContent:'center'}}>
        <Looks3RoundedIcon sx={{marginRight:'auto'}}/>
        <Button variant="contained" sx={{margin:'auto', marginTop:'5px', marginBottom:'5px', justifySelf:'center'}} onClick={()=>{
          if (worker.current)
            worker.current.postMessage({...settings, ...imageProperties})
        }}>Start Generating</Button>
        <div style={{margin:'auto'}}/>
      </Paper>
    </Box>
  ) 
}

export default MenuBar
