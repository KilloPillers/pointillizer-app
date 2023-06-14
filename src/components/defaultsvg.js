import React from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import {
  ReactSvgPanZoomLoader,
  SvgLoaderSelectElement
} from "react-svg-pan-zoom-loader";

function DefaultSVG() {
  return (
    <div style={{height:"100%"}}>
      <ReactSvgPanZoomLoader height={"100%"}
        src="../logo.svg"
        proxy={
          <>
            <SvgLoaderSelectElement height={"100%"}
              selector="#maturetree"
              onClick={e => alert("Tree")}
            />
          </>
        }
        render={content => (
          <UncontrolledReactSVGPanZoom width={"100%"} height={"85vh"}>
            <svg width={1680} height={880}>
              {content}
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      />
    </div>
  );
}

export default DefaultSVG;
