import { View, Text } from 'react-native'
import { Path, Rect, Svg } from 'react-native-svg'
type Props = {}
const Check = (props: Props) => {
    return (
        <Svg width="60" height="54" viewBox="0 0 60 54" fill="none" >
            <Rect width="60" height="54" rx="16" fill="#27736E" />
            <Path d="M26.1992 32.0471L26.201 32.0452L21.1707 27.0148C21.0008 26.8392 20.9068 26.604 20.9087 26.3597C20.9107 26.1155 21.0085 25.8818 21.1811 25.7089C21.3537 25.5361 21.5872 25.4379 21.8315 25.4356C22.0758 25.4334 22.3111 25.5271 22.4869 25.6967L27.5173 30.728L37.3983 20.8488C37.4843 20.7599 37.5871 20.6889 37.7007 20.6401C37.8144 20.5913 37.9366 20.5656 38.0603 20.5645C38.184 20.5634 38.3067 20.587 38.4211 20.6338C38.5356 20.6807 38.6396 20.7498 38.7271 20.8373C38.8146 20.9248 38.8837 21.0288 38.9306 21.1433C38.9774 21.2577 39.001 21.3804 38.9999 21.5041C38.9988 21.6278 38.9731 21.75 38.9243 21.8637C38.8755 21.9773 38.8045 22.0801 38.7155 22.1661L28.175 32.7057C28.0003 32.8803 27.7634 32.9784 27.5164 32.9784C27.2694 32.9784 27.0325 32.8803 26.8578 32.7057L26.1992 32.0471Z" fill="white" />
        </Svg>



    )
}
export default Check