import React, { useState } from "react"
import { Dropdown } from 'react-bootstrap'
import './menubar.css'
import PoissonSettings from './poissonsettings'

function MenuBar({scriptSetter, settings, settingsSetter, imageProperties, imagePropertiesSetter, worker}) {
  const [script, setScript] = useState("")

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
        //setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  function SettingsMenu(script) {
    switch (script){
      case "/poissonWorker.js":
        return <PoissonSettings settings={settings} settingsSetter={settingsSetter}></PoissonSettings>
      default:
        return <div>NO GENERATOR</div>

    }
  }

  function handleSelect(eventKey) {
    scriptSetter(eventKey)
    setScript(eventKey)
  }

  return (
    <div className="settings">
      <div className="settings-head">
        <div className="Title">Settings</div>
        <input type='file' accept='image/*'onChange={handleImageUpload}/>
        <div>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Select a Generator
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="/poissonWorker.js">Poisson Generator</Dropdown.Item>
              <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
              <Dropdown.Item eventKey="option3">Option 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {script && <p>Selected option: {script}</p>}
        </div>
      </div>
      {SettingsMenu(script)}
      <div className="settings-foot">
        <button onClick={()=>{
          if (worker.current)
            worker.current.postMessage({...settings, ...imageProperties})
        }}>Start Generating</button>
      </div>
    </div>
  ) 
}

export default MenuBar
