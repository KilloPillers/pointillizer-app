import React, {useRef, useEffect, useState} from "react";
import { useWindowSize } from '@react-hook/window-size'
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { ReactSvgPanZoomLoader, SvgLoaderSelectElement } from "react-svg-pan-zoom-loader";
import "./defaultsvg.css"

const toolbarProps = {
  toolbarPosition: "left"
}

function DefaultSVG() {
  const Viewer = useRef(null);
  const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);


  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
      <ReactSvgPanZoomLoader className="loader"
        src="%PUBLIC_URL%/../dotillismiologo.svg"
        proxy={
            <SvgLoaderSelectElement height={"100%"}
              selector="#maturetree"
              onClick={e => alert("Tree")}
            />
        }
        render={content => (
          <UncontrolledReactSVGPanZoom 
          width={isMobile ? width : width-400} height={isMobile ? height-112 : height-120} 
          ref={Viewer}
          detectAutoPan={false}
          defaultTool="pan"
          toolbarProps={toolbarProps}>
            <svg width={626} height={626}>
              {content}
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      />
  );
}

export default DefaultSVG;
