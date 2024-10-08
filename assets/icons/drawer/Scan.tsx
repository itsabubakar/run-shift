import { Path, Svg } from 'react-native-svg'
type Props = {
    color?: string
}
const Scan = ({ color }: Props) => {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" >
            <Path d="M2.75 6.41667V4.58333C2.75 4.0971 2.94315 3.63079 3.28697 3.28697C3.63079 2.94315 4.0971 2.75 4.58333 2.75H6.41667M15.5833 2.75H17.4167C17.9029 2.75 18.3692 2.94315 18.713 3.28697C19.0568 3.63079 19.25 4.0971 19.25 4.58333V6.41667M19.25 15.5833V17.4167C19.25 17.9029 19.0568 18.3692 18.713 18.713C18.3692 19.0568 17.9029 19.25 17.4167 19.25H15.5833M6.41667 19.25H4.58333C4.0971 19.25 3.63079 19.0568 3.28697 18.713C2.94315 18.3692 2.75 17.9029 2.75 17.4167V15.5833" stroke={color || "#606060"} stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>


    )
}
export default Scan