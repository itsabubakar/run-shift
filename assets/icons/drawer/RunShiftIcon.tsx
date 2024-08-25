import { View, Text } from 'react-native'
import { Path, Svg } from 'react-native-svg'
type Props = {
    color?: string
}
const RunShiftIcon = ({ color }: Props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Path d="M2 12C2 8.229 2 6.343 3.172 5.172C4.343 4 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C22 6.343 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.657 22 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2 19.657 2 17.771 2 14V12Z" stroke={color || "#606060"} stroke-width="1.5" />
            <Path d="M7 4V2.5M17 4V2.5" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" />
            <Path d="M9 14.5L10.5 13V17" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M2.5 9H21.5M13 16V14C13 13.7348 13.1054 13.4804 13.2929 13.2929C13.4804 13.1054 13.7348 13 14 13C14.2652 13 14.5196 13.1054 14.7071 13.2929C14.8946 13.4804 15 13.7348 15 14V16C15 16.2652 14.8946 16.5196 14.7071 16.7071C14.5196 16.8946 14.2652 17 14 17C13.7348 17 13.4804 16.8946 13.2929 16.7071C13.1054 16.5196 13 16.2652 13 16Z" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" />
        </Svg>



    )
}
export default RunShiftIcon