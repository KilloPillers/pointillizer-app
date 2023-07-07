import React, { useEffect, useRef, useState } from 'react'
import { Global } from '@emotion/react';
import { Box, CssBaseline, styled } from '@mui/material'
import { grey } from '@mui/material/colors';
import './Home.css'
import SVGWindow from './svgwindow'
import PageHeader from './header'
import MenuBar from './menubar'
import DefaultSVG from './defaultsvg'
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  overflow: 'visible',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  overflow: 'visible',
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

//TODO create a child component that will call postMessageToWorker
function Home() {
  const [imageProperties, setImageProperties] = useState(null)
  const [script, setScript] = useState(null)
  const [settings, setSettings] = useState(null)
  const [circles, setCircles] = useState(null)
  const [open, setOpen] = React.useState(false);
  const workerRef = useRef(null)
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (script === null)
      return
      
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
      <CssBaseline/>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: 'auto',
            overflow: 'visible',
          },
        }}
      />
      <PageHeader generator={workerRef}></PageHeader>
      <div className={isMobile ? 'Body-mobile':'Body-desktop'}>
        <>
        {!isMobile ? (
          <MenuBar
          className="settings-desktop"
          scriptSetter={setScript} 
          settings={settings} settingsSetter={setSettings} 
          imageProperties={imageProperties} imagePropertiesSetter={setImageProperties} 
          worker={workerRef}>
          </MenuBar>
        ):(
          <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
              }}
            >
              <Puller/>
              <Typography sx={{ p: 2, color: 'text.secondary' }}>Settings Menu</Typography>
            </StyledBox>
            <StyledBox
              className='drawer-content'
              sx={{
                px: 2,
                pb: 2,
                height: '100%',
              }}
            >
              <MenuBar 
              className={"settings-mobile"}
              scriptSetter={setScript} 
              settings={settings} settingsSetter={setSettings} 
              imageProperties={imageProperties} imagePropertiesSetter={setImageProperties} 
              worker={workerRef}>
              </MenuBar>
            </StyledBox>
          </SwipeableDrawer>          
          )}
        </>
        <div className='SVG' id='SVGwindow'>
        {svgwindow()}
        </div>
      </div>
    </Box>
  );
}

export default Home;
