import { View, Text } from 'react-native'
import { Path, Svg } from 'react-native-svg'
type Props = {
    color?: string
}
const Logout = ({ color }: Props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Path d="M9 4.49996H8C5.643 4.49996 4.464 4.49996 3.732 5.23196C3 5.96396 3 7.14296 3 9.49996V14.5C3 16.857 3 18.035 3.732 18.768C4.464 19.5 5.643 19.5 8 19.5H9M9 6.47596C9 4.18296 9 3.03596 9.707 2.40896C10.414 1.78196 11.495 1.96996 13.657 2.34696L15.987 2.75396C18.381 3.17096 19.578 3.37996 20.289 4.25796C21 5.13696 21 6.40696 21 8.94796V15.053C21 17.593 21 18.863 20.29 19.742C19.578 20.62 18.38 20.829 15.986 21.247L13.658 21.653C11.496 22.03 10.415 22.218 9.708 21.591C9 20.964 9 19.817 9 17.524V6.47596Z" stroke={color || "#606060"} stroke-width="1.5" />
            <Path d="M12 11V13" stroke={color || "#606060"} stroke-width="1.5" stroke-linecap="round" />
        </Svg>

    )
}
export default Logout