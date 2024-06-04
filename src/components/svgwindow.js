import React from "react";
import { useEffect } from "react"
import { useWindowSize } from "@react-hook/window-size";
import { ReactSVGPanZoom, TOOL_PAN, MODE_PANNING, INITIAL_VALUE} from "react-svg-pan-zoom";
import { useState } from "react";

function SVGWindow({circles, width, height}) {
  const [tool, setTool] = useState(TOOL_PAN)
  const [value, setValue] = useState(INITIAL_VALUE)
  const [windowWidth, windowHeight] = useWindowSize({initialWidth: 400, initialHeight: 400})
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    setTool(TOOL_PAN)
  }, [])

  return (
      <ReactSVGPanZoom 
      width={isMobile ? windowWidth : windowWidth-400} height={isMobile ? windowHeight-112 : windowHeight-120} 
      tool={tool} onChangeTool={setTool}
      value={value} onChangeValue={setValue}
      detectAutoPan={false}
      SVGBackground="grey"
      id="SVGTEST"
      >
        <svg width={width} height={height} id="SVGImage"> { 
          circles.map((circle, index) => {
            return <circle 
              key={index}
              cx={circle[0]} 
              cy={circle[1]}
              r={circle[2]}
              fill={`rgb(${circle[3][0]},${circle[3][1]},${circle[3][2]})`}
              strokeWidth={.001}/>  
          })} 
        </svg>  
      </ReactSVGPanZoom>
  );
}

export default SVGWindow;
