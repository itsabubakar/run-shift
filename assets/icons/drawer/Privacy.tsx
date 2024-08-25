import { Path, Svg } from 'react-native-svg'
type Props = {
    color?: string
}
const Privacy = ({ color }: Props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 22.4964C12 22.4964 20.9986 19.4969 20.9986 11.998" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M20.9986 11.9984V2.99977C20.9986 2.99977 17.9991 1.5 12 1.5" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M12.0001 22.4964C12.0001 22.4964 3.00146 19.4969 3.00146 11.998" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M3.00146 11.9984V2.99977C3.00146 2.99977 6.001 1.5 12.0001 1.5" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    )
}
export default Privacy