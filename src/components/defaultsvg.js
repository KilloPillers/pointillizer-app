import React from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import {
  ReactSvgPanZoomLoader,
  SvgLoaderSelectElement
} from "react-svg-pan-zoom-loader";

function DefaultSVG() {
  return (
      <ReactSvgPanZoomLoader height={"100%"}
        src="%PUBLIC_URL%/../logo.svg"
        proxy={
            <SvgLoaderSelectElement height={"100%"} id="tes3"
              selector="#maturetree"
              onClick={e => alert("Tree")}
            />
        }
        render={content => (
          <UncontrolledReactSVGPanZoom width={"100%"} height={"92vh"} id="test2">
            <svg width={1680} height={880}>
              {content}
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      />
  );
}

export default DefaultSVG;
