import React from "react";
import { ReactSVGPanZoom, TOOL_NONE, INITIAL_VALUE } from "react-svg-pan-zoom";
import { useState } from "react";

function SVGWindow({circles, width, height}) {
  const [tool, setTool] = useState(TOOL_NONE)
  const [value, setValue] = useState(INITIAL_VALUE)

  return (
      <ReactSVGPanZoom 
      width={"100%"} height={"100%"} 
      tool={tool} onChangeTool={setTool}
      value={value} onChangeValue={setValue}
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