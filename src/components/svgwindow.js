import React from "react";
import { useState, useEffect } from "react";

function SVGWindow({radius, width, height, k, n, pixels}) {
  const [points, setPoints] = useState([])

  useEffect(() => {
    console.log("RGB Values: ", pixels)
    //Create a new web worker
    const worker = new Worker('/poissonWorker.js')

    worker.addEventListener('error', (err) => {
      console.error("Error Loading Web Worker:", err)
    })

    //Generate a unique component ID
    //const componentId = Math.random().toString(36).substring(7)

    //Function to handle messages received from the web worker
    function handleWorkerMessage(event) {
      //const {componenId: receivedComponentId, receivedPoints} = event.data
      //if (componentId === receivedComponentId)
      const receivedPoints = event.data
      setPoints(receivedPoints)
    }
    
    //Attach the message event listener
    worker.addEventListener('message', handleWorkerMessage)

    //Function to trigger the point generator
    function generatePoints() {
      //Send a message to the web worker
      worker.postMessage({radius, width, height, k, n, pixels})
    }

    //Call the point generation function
    generatePoints();

    return () => {
      worker.removeEventListener('message', handleWorkerMessage)
      worker.terminate()
    }
  }, []) 

  function GenerateCircleElement(circle, index) {
    try {
      const color = `rgb(${pixels[Math.floor(circle[0])*Math.floor(circle[1])][0]},${pixels[Math.floor(circle[0])*Math.floor(circle[1])][1]},${pixels[Math.floor(circle[0])*Math.floor(circle[1])][2]})`
      return <circle 
              key={index}
              cx={circle[0]} 
              cy={circle[1]}
              r={radius}
              fill={color}/>       
    } catch (error) {
      console.error(pixels[Math.floor(circle[0])*Math.floor(circle[1])])
    }
  }

  return (
    <>
    {points.length > 0 ? (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}> { 
        points.map((circle, index) => (
          GenerateCircleElement(circle,index)
        ))} 
      </svg>
      ) : ( 
      <header>Loading...</header>
      )}
    </>
  );
}

export default SVGWindow;
