import React, { useEffect, useRef, useState } from 'react'
import { Box, Paper } from '@mui/material'
import './App.css'
import SVGWindow from './components/svgwindow'
import PageHeader from './components/header'
import MenuBar from './components/menubar'
import DefaultSVG from './components/defaultsvg'

//TODO create a child component that will call postMessageToWorker
function App() {
  const [imageProperties, setImageProperties] = useState(null)
  const [script, setScript] = useState(null)
  const [settings, setSettings] = useState(null)
  const [circles, setCircles] = useState(null)
  const workerRef = useRef(null)

  useEffect(() => {
    if (script === null)
      return
    //Create a new web worker
    const worker = new Worker(process.env.PUBLIC_URL+script)

    workerRef.current = worker

    worker.onmessage = (event) => {
      setCircles(event.data)
    } 

    return () => {
      worker.terminate()
    }
  }, [script]) 

  function svgwindow() {
    if (circles != null)
      return <SVGWindow circles={circles} width={imageProperties.width} height={imageProperties.height}></SVGWindow> 
    return <DefaultSVG/>
  }

  return (
    <Box className='App'>
      <PageHeader generator={workerRef}></PageHeader>
      <div className='Body'>
        <MenuBar scriptSetter={setScript} 
        settings={settings} settingsSetter={setSettings} imageProperties={imageProperties}
        imagePropertiesSetter={setImageProperties} worker={workerRef}>
        </MenuBar>
        <div className='SVG' id='SVGwindow'>
          {svgwindow()}
        </div>
      </div>
    </Box>
  );
}

export default App;
