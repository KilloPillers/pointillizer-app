import React from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { ReactSvgPanZoomLoader, SvgLoaderSelectElement } from "react-svg-pan-zoom-loader";
import "./defaultsvg.css"

function DefaultSVG() {
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
          <UncontrolledReactSVGPanZoom width={"100%"} height={"100%"} id="test2">
            <svg width={626} height={626}>
              {content}
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      />
  );
}

export default DefaultSVG;
