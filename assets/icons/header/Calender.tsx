import { View, Text } from 'react-native'
import { Path, Svg } from 'react-native-svg'
type Props = {
    color?: string
}
const Calender = ({ color }: Props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Path d="M7.75 2.5C7.75 2.30109 7.67098 2.11032 7.53033 1.96967C7.38968 1.82902 7.19891 1.75 7 1.75C6.80109 1.75 6.61032 1.82902 6.46967 1.96967C6.32902 2.11032 6.25 2.30109 6.25 2.5V4.08C4.81 4.195 3.866 4.477 3.172 5.172C2.477 5.866 2.195 6.811 2.079 8.25H21.921C21.805 6.81 21.523 5.866 20.828 5.172C20.134 4.477 19.189 4.195 17.75 4.079V2.5C17.75 2.30109 17.671 2.11032 17.5303 1.96967C17.3897 1.82902 17.1989 1.75 17 1.75C16.8011 1.75 16.6103 1.82902 16.4697 1.96967C16.329 2.11032 16.25 2.30109 16.25 2.5V4.013C15.585 4 14.839 4 14 4H10C9.161 4 8.415 4 7.75 4.013V2.5Z" fill="white" />
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 11.161 2 10.415 2.013 9.75H21.987C22 10.415 22 11.161 22 12V14C22 17.771 22 19.657 20.828 20.828C19.657 22 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2 19.657 2 17.771 2 14V12ZM17 14C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12C16.7348 12 16.4804 12.1054 16.2929 12.2929C16.1054 12.4804 16 12.7348 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17C18 16.7348 17.8946 16.4804 17.7071 16.2929C17.5196 16.1054 17.2652 16 17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM7 14C7.26522 14 7.51957 13.8946 7.70711 13.7071C7.89464 13.5196 8 13.2652 8 13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM7 18C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z" fill={color || "white"} />
        </Svg>

    )
}
export default Calender