import React, { useEffect, useState } from "react";
import Slider from "react-slider";

function PoissonSettings({settings, settingsSetter}) {
  const [radius, setRadius] = useState(5)
  const [k, setK] = useState(30)
  const [padding, setPadding] = useState(5)
  
  useEffect(() => {
    const newSettings = {...settings, radius:radius, k:k, padding:padding} 
    settingsSetter(newSettings)
  },[radius, k, padding])

  return (
    <div>
      <div className="contaier">
        <div className="radius">
          <p>Radius Value: {radius}</p>
          <Slider
            value={radius}
            onChange={newValue => setRadius(newValue)}
            min={1}
            max={20}
            step={1}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />
          <p>K Value: {k}</p>
          <Slider
            value={k}
            onChange={newValue => setK(newValue)}
            min={1}
            max={30}
            step={1}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />
          <p>Padding Value: {padding}</p>
          <Slider
            value={padding}
            onChange={newValue => setPadding(newValue)}
            min={1}
            max={20}
            step={1}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />
        </div>
      </div>
    </div>
  )
}

export default PoissonSettings
