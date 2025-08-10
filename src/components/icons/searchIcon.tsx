import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface iconProps{
  color:string
}
const SearchIcon:React.FC<iconProps>=({color})=>{
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill={color}
    >
      <Path
        d="M13 11.5h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34A6.505 6.505 0 00.55 7.82c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28V13l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L13 11.5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5S4.51 2.5 7 2.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"
        fill={color}
      />
    </Svg>
  )
}

export default SearchIcon
