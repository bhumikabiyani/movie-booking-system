import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface iconProp{
  color:string
}
const MyBookingIcon:React.FC<iconProp>=({color})=> {
  return (
    <Svg
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill={color}
    >
      <Path
        d="M0 4h12v2H0V4zm0-4h12v2H0V0zm0 8h8v2H0V8zm10 0v6l5-3-5-3z"
        fill={color}
      />
    </Svg>
  )
}

export default MyBookingIcon
