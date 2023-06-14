import React from "react";
import { ReactSVGPanZoom, TOOL_NONE, INITIAL_VALUE } from "react-svg-pan-zoom";
import { useState, useEffect, useRef } from "react";

function SVGWindow({circles, width, height}) {
  const [tool, setTool] = useState(TOOL_NONE)
  const [value, setValue] = useState(INITIAL_VALUE)
  const Viewer = useRef(null)

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, [])

  return (
      <ReactSVGPanZoom 
      ref={Viewer}  
      width={1600} height={800} 
      tool={tool} onChangeTool={setTool}
      value={value} onChangeValue={setValue}
      >
        <svg width={width} height={height}> { 
          circles.map((circle, index) => {
            return <circle 
              key={index}
              cx={circle[0]} 
              cy={circle[1]}
              r={circle[2]}
              fill={circle[3]}
              strokeWidth={.001}/>  
          })} 
        </svg>  
      </ReactSVGPanZoom>
  );
}

export default SVGWindow;