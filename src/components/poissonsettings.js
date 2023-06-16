import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, Stack, Slider } from "@mui/material";
import "./poissonsettings.css"

function PoissonSettings({settings, settingsSetter}) {
  const [radius, setRadius] = useState(5)
  const [k, setK] = useState(30)
  const [padding, setPadding] = useState(5)
  
  useEffect(() => {
    const newSettings = {...settings, radius:radius, k:k, padding:padding} 
    settingsSetter(newSettings)
  },[radius, k, padding])

  return (
    <div className="setting-container">
      <div className="setting-title">Poisson Disc Sampling</div>
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
          <p>K Value: {k}</p>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ChevronLeftIcon fontSize="medium"/>
            <Slider aria-label="Volume" marks min={1} max={20} value={k} onChange={(event, newValue)=>{setK(newValue)}} />
            <ChevronRightIcon fontSize="medium"/>
          </Stack>
        </div>
        <div>
          <p>Padding Value: {padding}</p>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ChevronLeftIcon fontSize="medium"/>
            <Slider aria-label="Volume" value={padding} marks min={(radius * -1) + 1 } max={15} onChange={(event, newValue)=>{setPadding(newValue)}} />
            <ChevronRightIcon fontSize="medium"/>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default PoissonSettings
