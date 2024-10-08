import { View, Text } from 'react-native'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
type Props = {}
const Exclamination = (props: Props) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
            <G clip-path="url(#clip0_123_864)">
                <Path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM11 16H9V14H11V16ZM11 12H9V4H11V12Z" fill="black" />
            </G>
            <Defs>
                <ClipPath id="clip0_123_864">
                    <Rect width="20" height="20" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>

    )
}
export default Exclamination