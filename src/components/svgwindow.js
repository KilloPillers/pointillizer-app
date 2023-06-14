import React from "react";
import { ReactSVGPanZoom, TOOL_NONE, INITIAL_VALUE } from "react-svg-pan-zoom";
import { useState } from "react";

function SVGWindow({circles, width, height}) {
  const [tool, setTool] = useState(TOOL_NONE)
  const [value, setValue] = useState(INITIAL_VALUE)

  return (
      <ReactSVGPanZoom 
      width={"100%"} height={"85vh"} 
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