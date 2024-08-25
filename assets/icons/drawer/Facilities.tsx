import { Path, Svg } from "react-native-svg"

type Props = {
    color?: string
}
const Facilities = ({ color }: Props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Path d="M20.25 3.75H12.75V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85217 2.25 5.25V16.5C2.25 16.8978 2.40804 17.2794 2.68934 17.5607C2.97064 17.842 3.35218 18 3.75 18H7.44L5.41406 20.5312C5.28974 20.6866 5.23225 20.8851 5.25422 21.0829C5.2762 21.2807 5.37585 21.4616 5.53125 21.5859C5.68665 21.7103 5.88507 21.7678 6.08286 21.7458C6.28066 21.7238 6.46162 21.6241 6.58594 21.4687L9.36 18H14.64L17.4141 21.4687C17.4756 21.5457 17.5517 21.6098 17.638 21.6573C17.7244 21.7048 17.8192 21.7349 17.9171 21.7458C18.0151 21.7567 18.1142 21.7481 18.2088 21.7207C18.3035 21.6933 18.3918 21.6475 18.4688 21.5859C18.5457 21.5244 18.6098 21.4483 18.6573 21.3619C18.7048 21.2756 18.7349 21.1808 18.7458 21.0829C18.7567 20.9849 18.7481 20.8858 18.7207 20.7912C18.6933 20.6965 18.6475 20.6082 18.5859 20.5312L16.56 18H20.25C20.6478 18 21.0294 17.842 21.3107 17.5607C21.592 17.2794 21.75 16.8978 21.75 16.5V5.25C21.75 4.85217 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM20.25 16.5H3.75V5.25H20.25V16.5ZM9.75 11.25V13.5C9.75 13.6989 9.67098 13.8897 9.53033 14.0303C9.38968 14.171 9.19891 14.25 9 14.25C8.80109 14.25 8.61032 14.171 8.46967 14.0303C8.32902 13.8897 8.25 13.6989 8.25 13.5V11.25C8.25 11.0511 8.32902 10.8603 8.46967 10.7197C8.61032 10.579 8.80109 10.5 9 10.5C9.19891 10.5 9.38968 10.579 9.53033 10.7197C9.67098 10.8603 9.75 11.0511 9.75 11.25ZM12.75 9.75V13.5C12.75 13.6989 12.671 13.8897 12.5303 14.0303C12.3897 14.171 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.171 11.4697 14.0303C11.329 13.8897 11.25 13.6989 11.25 13.5V9.75C11.25 9.55109 11.329 9.36032 11.4697 9.21967C11.6103 9.07902 11.8011 9 12 9C12.1989 9 12.3897 9.07902 12.5303 9.21967C12.671 9.36032 12.75 9.55109 12.75 9.75ZM15.75 8.25V13.5C15.75 13.6989 15.671 13.8897 15.5303 14.0303C15.3897 14.171 15.1989 14.25 15 14.25C14.8011 14.25 14.6103 14.171 14.4697 14.0303C14.329 13.8897 14.25 13.6989 14.25 13.5V8.25C14.25 8.05109 14.329 7.86032 14.4697 7.71967C14.6103 7.57902 14.8011 7.5 15 7.5C15.1989 7.5 15.3897 7.57902 15.5303 7.71967C15.671 7.86032 15.75 8.05109 15.75 8.25Z" fill={color || "#606060"} />
        </Svg>

    )
}
export default Facilities