import * as React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { StackActions, useNavigation } from "@react-navigation/native";

interface ArrowIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

function ArrowIcon(props: ArrowIconProps) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <Svg
        width={props.width || 16}
        height={props.height || 16}
        viewBox="0 0 16 16"
        fill="none"
      >
        <Path
          d="M16 7H3.83l5.59-5.59L8 0 0 8l8 8 1.41-1.41L3.83 9H16V7z"
          fill={props.fill || "#fff"}
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default ArrowIcon;
