import * as React from "react";
import { ViewProps } from "react-native";
import Svg, { Path } from "react-native-svg";

interface ISVGStyle {
  style?: ViewProps;
}

function CrossIcon(props: ISVGStyle) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      style={props?.style}
    >
      <Path
        d="M11.833 1.342L10.658.167 5.999 4.825 1.341.167.166 1.342 4.824 6 .166 10.658l1.175 1.175 4.658-4.658 4.659 4.658 1.175-1.175L7.174 6l4.659-4.658z"
        fill="#686868"
      />
    </Svg>
  );
}

export default CrossIcon;
