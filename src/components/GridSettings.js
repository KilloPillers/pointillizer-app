import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Divider, Stack, Slider, FormControlLabel, Switch } from "@mui/material";
import "./FSSsettings.css"

function GridSettings({settings, settingsSetter}) {
  const [radius, setRadius] = useState(5)
  const [is_recursive, setIsRecursive] = useState(false)

  useEffect(() => {
    const newSettings = {...settings, radius:radius, is_recursive:is_recursive} 
    settingsSetter(newSettings)
  },[radius, is_recursive])

  const handleChecked = (event) => {
    setIsRecursive(event.target.checked);
  };

  return (
    <div className="setting-container">
      <div className="setting-title">Grid</div>
      <Divider/>
      <div className="interactables"> 
        <div style={{marginBottom:"20px"}}>
            <FormControlLabel
                value="start"
                control={<Switch checked={is_recursive} onChange={handleChecked} color="primary" />}
                label="Recursive"
                labelPlacement="start"
            />
        </div>
        <div className="radius">
          <div>Radius Value: {radius}</div>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <FiberManualRecordIcon fontSize="small"/>
            <Slider aria-label="Volume" value={radius} marks min={1} max={20} onChange={(event, newValue)=>{setRadius(newValue)}} />
            <FiberManualRecordIcon fontSize="large"/>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default GridSettings
