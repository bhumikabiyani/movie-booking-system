import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SideArrow() {
  return (
    <Svg
      width={17}
      height={18}
      viewBox="0 0 12 16"
      fill="none"
    >
      <Path
        d="M9 3L7.942 4.058l4.185 4.192H3v1.5h9.127l-4.185 4.193L9 15l6-6-6-6z"
        fill="#4A148C"
      />
    </Svg>
  );
}

export default SideArrow;
