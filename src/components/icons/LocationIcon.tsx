import * as React from "react"
import { StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"

function LocationIcon() {
  return (
    <Svg
      width={12}
      height={16}
      viewBox="0 0 12 16"
      fill="none"
    >
      <Path
        d="M6 .5A5.246 5.246 0 00.75 5.75C.75 9.688 6 15.5 6 15.5s5.25-5.813 5.25-9.75A5.246 5.246 0 006 .5zm0 7.125a1.876 1.876 0 11.001-3.751A1.876 1.876 0 016 7.625z"
        fill="#686868"
      />
    </Svg>
  )
}

export default LocationIcon

