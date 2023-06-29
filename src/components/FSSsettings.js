import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, Stack, Slider } from "@mui/material";
import "./FSSsettings.css"

function FSSsettings({settings, settingsSetter}) {
  const [radius, setRadius] = useState(4)
  const [fillPercent, setfillPercent] = useState(75)
  
  useEffect(() => {
    const newSettings = {...settings, radius:radius, fillPercent:fillPercent} 
    settingsSetter(newSettings)
  },[radius, fillPercent])

  return (
    <div className="setting-container">
      <div className="setting-title">Fibonacci Sunflower Spiral</div>
      <Divider/>
      <div className="interactables"> 
        <div className="radius">
          <div>Radius Value: {radius}</div>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <FiberManualRecordIcon fontSize="small"/>
            <Slider aria-label="Volume" value={radius} marks min={.1} max={4.5} step={.1} onChange={(event, newValue)=>{setRadius(newValue)}} />
            <FiberManualRecordIcon fontSize="large"/>
          </Stack>
        </div>
        <div className="fill_percent">
          <div>Fill Percentage: {fillPercent}%</div>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ChevronLeftIcon/>
            <Slider aria-label="Volume" value={fillPercent} min={1} max={100} step={1} onChange={(event, newValue)=>{setfillPercent(newValue)}} />
            <ChevronRightIcon/>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default FSSsettings
