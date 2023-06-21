import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Divider, Stack, Slider, Paper } from "@mui/material";
import "./poissonsettings.css"
import "./APDSsettings.css"

function valuetext(value) {
  return `${value} pixels`;
}

function valueLabel(range) {
  return `Min dot radius: ${range[0]} - Max dot radius: ${range[1]}`
}

const minDiff = 1

function APDSsettings({settings, settingsSetter}) {
  const [is_inverted, setIsInverted] = useState(false)
  const [k, setK] = useState(20)
  const [radius_range, setRadiusRange] = useState([5, 10]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
        setRadiusRange([Math.min(newValue[0], radius_range[1] - minDiff), radius_range[1]]);
    } else {
        setRadiusRange([radius_range[0], Math.max(newValue[1], radius_range[0] + minDiff)]);
    }
  };

  const handleChecked = (event) => {
    setIsInverted(event.target.checked);
  };


  useEffect(() => {
    const newSettings = {...settings, min_radius:radius_range[0], max_radius:radius_range[1], is_inverted:is_inverted, k:k} 
    settingsSetter(newSettings)
  },[radius_range, k, is_inverted])

  return (
    <div className="setting-container">
      <div className="APDSsettings-Title">Adaptive Poisson Disc Sampling</div>
      <Divider/>
      <div className="interactables"> 
        <div className="APDSsettings-Inverted">
          <div>
            <FormControlLabel
              value="start"
              control={<Switch checked={is_inverted} onChange={handleChecked} color="primary" />}
              label="Invert Grey Scale"
              labelPlacement="start"
            />
          </div>
          <Paper elevation={3} className="APDSsettings-IconDisplay" style={{ backgroundColor: '#1976d2' }}>
            <FiberManualRecordIcon sx={{ color: "black" }} fontSize={is_inverted?"large":"small"}></FiberManualRecordIcon>
            <FiberManualRecordIcon sx={{ color: "white" }} fontSize={is_inverted?"small":"large"}></FiberManualRecordIcon>
          </Paper>
        </div>
        <div className="radius">
          <div>Radius Range: {valueLabel(radius_range)}</div>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <FiberManualRecordIcon fontSize="small"/>
            <Slider
            getAriaLabel={() => 'Minimum Radius'}
            value={radius_range}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={1}
            max={20}
            marks
            getAriaValueText={valuetext}
            disableSwap
            />
            <FiberManualRecordIcon fontSize="large"/>
          </Stack>
        </div>
        <div>
          <p>K Value: {k}</p>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ChevronLeftIcon fontSize="medium"/>
            <Slider aria-label="Volume" marks min={1} max={30} value={k} onChange={(event, newValue)=>{setK(newValue)}} />
            <ChevronRightIcon fontSize="medium"/>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default APDSsettings
