import { Path, Svg } from 'react-native-svg'
type Props = {
    width? : number
    height? : number
}
const ProfilePicture = (props: Props) => {
    return (
        <Svg width={props.width || "44"} height={props.height || "44"} viewBox="0 0 44 44" fill="none" >
            <Path d="M38.7953 35.9547C41.0393 33.2549 42.5999 30.0543 43.3453 26.6237C44.0907 23.1932 43.9989 19.6335 43.0776 16.246C42.1564 12.8584 40.4327 9.74255 38.0526 7.16201C35.6724 4.58146 32.7058 2.61213 29.4035 1.42061C26.1013 0.229096 22.5607 -0.149553 19.0812 0.316697C15.6017 0.782947 12.2857 2.08038 9.41362 4.09924C6.54159 6.1181 4.19804 8.79899 2.58124 11.9151C0.964434 15.0313 0.121933 18.491 0.125008 22.0016C0.126188 27.105 1.92461 32.045 5.2047 35.9547L5.17345 35.9813C5.28282 36.1125 5.40782 36.225 5.52032 36.3547C5.66095 36.5156 5.81251 36.6672 5.95782 36.8235C6.39532 37.2985 6.84532 37.7547 7.3172 38.1828C7.46095 38.3141 7.60938 38.436 7.7547 38.561C8.2547 38.9922 8.76876 39.4016 9.30157 39.7828C9.37032 39.8297 9.43282 39.8906 9.50157 39.9391V39.9203C13.1611 42.4956 17.5267 43.8777 22.0016 43.8777C26.4764 43.8777 30.842 42.4956 34.5016 39.9203V39.9391C34.5703 39.8906 34.6313 39.8297 34.7016 39.7828C35.2328 39.4 35.7484 38.9922 36.2484 38.561C36.3938 38.436 36.5422 38.3125 36.6859 38.1828C37.1578 37.7531 37.6078 37.2985 38.0453 36.8235C38.1906 36.6672 38.3406 36.5156 38.4828 36.3547C38.5938 36.225 38.7203 36.1125 38.8297 35.9797L38.7953 35.9547ZM22 9.50157C23.3907 9.50157 24.7501 9.91395 25.9064 10.6866C27.0626 11.4592 27.9639 12.5573 28.496 13.8421C29.0282 15.1269 29.1675 16.5406 28.8962 17.9046C28.6249 19.2685 27.9552 20.5213 26.9719 21.5047C25.9885 22.488 24.7357 23.1577 23.3717 23.429C22.0078 23.7003 20.5941 23.561 19.3093 23.0289C18.0245 22.4967 16.9263 21.5955 16.1537 20.4392C15.3811 19.2829 14.9688 17.9235 14.9688 16.5328C14.9688 14.668 15.7095 12.8796 17.0282 11.561C18.3468 10.2424 20.1352 9.50157 22 9.50157ZM9.51095 35.9547C9.53805 33.9031 10.3718 31.9446 11.8318 30.503C13.2918 29.0614 15.2607 28.2526 17.3125 28.2516H26.6875C28.7393 28.2526 30.7082 29.0614 32.1682 30.503C33.6282 31.9446 34.462 33.9031 34.4891 35.9547C31.0623 39.0427 26.6129 40.7517 22 40.7517C17.3871 40.7517 12.9378 39.0427 9.51095 35.9547Z" fill="#175B57" />
        </Svg>

    )
}
export default ProfilePicture