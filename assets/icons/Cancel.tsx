import { View, Text } from 'react-native'
import { Path, Rect, Svg } from 'react-native-svg'

const Cancel = (props: any) => {
    return (
        <Svg width="60" height="54" viewBox="0 0 60 54" fill="none" >
            <Rect width="60" height="54" rx="16" fill={props.fill || "#27736E"} />
            <Path d="M24.7581 32.2438L30.0011 27.0008L35.2441 32.2438M35.2441 21.7578L30.0001 27.0008L24.7581 21.7578" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    )
}
export default Cancel