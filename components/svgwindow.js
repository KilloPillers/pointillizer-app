import { __esModule } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import { useState } from "react";

function SVGViewer({width, height, circles}) {
  const [circles, setCircles] = useState([]);
  
  const addCircle = () => {
    const newCircle = (
      <circle key={circles.length+1} cx=
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      {circles}
    </svg>
  );
}

export default App;
