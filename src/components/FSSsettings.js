import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, Stack, Slider } from "@mui/material";
import "./FSSsettings.css"

function FSSsettings({settings, settingsSetter}) {
  const [radius, setRadius] = useState(5)
  const [n, setN] = useState(30)
  
  useEffect(() => {
    const newSettings = {...settings, radius:radius, n:n} 
    settingsSetter(newSettings)
  },[radius, n])

  return (
    <div className="setting-container">
      <div className="setting-title">Fibonacci Sunflower Spiral</div>
      <Divider/>
      <div className="interactables"> 
        <div className="radius">
          <div>Radius Value: {radius}</div>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <FiberManualRecordIcon fontSize="small"/>
            <Slider aria-label="Volume" value={radius} marks min={1} max={20} onChange={(event, newValue)=>{setRadius(newValue)}} />
            <FiberManualRecordIcon fontSize="large"/>
          </Stack>
        </div>
        <div>
          <p>Number of Dots: {n}</p>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ChevronLeftIcon fontSize="medium"/>
            <Slider aria-label="Volume" min={1} max={10000} value={n} onChange={(event, newValue)=>{setN(newValue)}} />
            <ChevronRightIcon fontSize="medium"/>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default FSSsettings
