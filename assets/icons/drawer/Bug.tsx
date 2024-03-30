import { Path, Svg } from "react-native-svg"

type Props = {
    color?: string
}
const Bug = ({ color }: Props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Path d="M19 15V11.938C19 10.8938 18.5852 9.89226 17.8469 9.15377C17.1086 8.41528 16.1072 8.00027 15.063 8H8.936C7.89192 8.00053 6.89079 8.41566 6.15271 9.15412C5.41462 9.89258 5 10.8939 5 11.938V15C5 15.9193 5.18106 16.8295 5.53284 17.6788C5.88463 18.5281 6.40024 19.2997 7.05025 19.9497C7.70026 20.5998 8.47194 21.1154 9.32122 21.4672C10.1705 21.8189 11.0807 22 12 22C12.9193 22 13.8295 21.8189 14.6788 21.4672C15.5281 21.1154 16.2997 20.5998 16.9497 19.9497C17.5998 19.2997 18.1154 18.5281 18.4672 17.6788C18.8189 16.8295 19 15.9193 19 15Z" stroke={color || "#606060"} stroke-width="1.5" />
            <Path d="M16.5 8.5V7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5V8.5" stroke={color || "#606060"} stroke-width="1.5" />
            <Path d="M19 14H22M5 14H2M14.5 3.5L17 2M9.5 3.5L7 2M20.5 20L18.5 19.2M20.5 8L18.5 8.8M3.5 20L5.5 19.2M3.5 8L5.5 8.8M12 21.5V15" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" />
        </Svg>

    )
}
export default Bug