import { View, Text } from 'react-native'
import { Path, Svg } from 'react-native-svg'
type Props = {}
const Jpg = (props: Props) => {
    return (
        <Svg width="49" height="49" viewBox="0 0 49 49" fill="none" >
            <Path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M28.5833 44.9173H20.4167C12.7175 44.9173 8.86695 44.9173 6.47616 42.5245C4.08333 40.1337 4.08333 36.2831 4.08333 28.584V20.4173C4.08333 12.7182 4.08333 8.86761 6.47616 6.47682C8.86695 4.08398 12.738 4.08398 20.4779 4.08398C21.7152 4.08398 22.7054 4.08398 23.5404 4.11869C23.5139 4.28203 23.4996 4.4474 23.4996 4.61686L23.4792 10.4029C23.4792 12.6426 23.4792 14.6231 23.6935 16.2176C23.9263 17.9469 24.4592 19.6762 25.872 21.089C27.2807 22.4978 29.0121 23.0327 30.7414 23.2654C32.3359 23.4798 34.3163 23.4798 36.556 23.4798H44.8289C44.9167 24.5701 44.9167 25.9094 44.9167 27.6918V28.584C44.9167 36.2831 44.9167 40.1337 42.5238 42.5245C40.133 44.9173 36.2825 44.9173 28.5833 44.9173Z" fill="black" />
            <Path d="M17.836 25.0124V31.3604C17.836 32.0004 17.64 32.5164 17.248 32.9084C16.856 33.2924 16.332 33.4844 15.676 33.4844C14.996 33.4844 14.452 33.2804 14.044 32.8724C13.644 32.4564 13.444 31.8964 13.444 31.1924H14.296C14.304 31.6484 14.416 32.0204 14.632 32.3084C14.856 32.5964 15.204 32.7404 15.676 32.7404C16.124 32.7404 16.456 32.6084 16.672 32.3444C16.888 32.0804 16.996 31.7524 16.996 31.3604V25.0124H17.836ZM25.3123 27.4244C25.3123 28.1444 25.0763 28.7244 24.6043 29.1644C24.1323 29.6044 23.4243 29.8244 22.4803 29.8244H20.7883V33.4004H19.9483V25.0124H22.4803C23.4163 25.0124 24.1203 25.2324 24.5923 25.6724C25.0723 26.1124 25.3123 26.6964 25.3123 27.4244ZM22.4803 29.1044C23.7923 29.1044 24.4483 28.5444 24.4483 27.4244C24.4483 26.8644 24.2923 26.4404 23.9803 26.1524C23.6683 25.8644 23.1683 25.7204 22.4803 25.7204H20.7883V29.1044H22.4803ZM33.3217 27.4604C33.0817 26.9084 32.7137 26.4764 32.2177 26.1644C31.7297 25.8444 31.1537 25.6844 30.4897 25.6844C29.8657 25.6844 29.3057 25.8284 28.8097 26.1164C28.3137 26.4044 27.9217 26.8164 27.6337 27.3524C27.3457 27.8804 27.2017 28.4964 27.2017 29.2004C27.2017 29.9044 27.3457 30.5244 27.6337 31.0604C27.9217 31.5964 28.3137 32.0084 28.8097 32.2964C29.3057 32.5844 29.8657 32.7284 30.4897 32.7284C31.0737 32.7284 31.5977 32.6044 32.0617 32.3564C32.5337 32.1004 32.9097 31.7404 33.1897 31.2764C33.4777 30.8044 33.6417 30.2564 33.6817 29.6324H30.1537V28.9484H34.5697V29.5604C34.5297 30.2964 34.3297 30.9644 33.9697 31.5644C33.6097 32.1564 33.1257 32.6244 32.5177 32.9684C31.9177 33.3124 31.2417 33.4844 30.4897 33.4844C29.7137 33.4844 29.0097 33.3044 28.3777 32.9444C27.7457 32.5764 27.2457 32.0684 26.8777 31.4204C26.5177 30.7644 26.3377 30.0244 26.3377 29.2004C26.3377 28.3764 26.5177 27.6404 26.8777 26.9924C27.2457 26.3364 27.7457 25.8284 28.3777 25.4684C29.0097 25.1004 29.7137 24.9164 30.4897 24.9164C31.3857 24.9164 32.1697 25.1404 32.8417 25.5884C33.5137 26.0364 34.0017 26.6604 34.3057 27.4604H33.3217Z" fill="white" />
            <Path d="M23.4996 4.61633L23.4792 10.4045C23.4792 12.6442 23.4792 14.6225 23.6935 16.2191C23.9263 17.9484 24.4592 19.6777 25.872 21.0885C27.2808 22.4993 29.0121 23.0342 30.7414 23.267C32.3359 23.4813 34.3163 23.4813 36.556 23.4813H44.8289C44.8554 23.7978 44.8738 24.1367 44.886 24.5022H44.9167C44.9167 23.955 44.9167 23.6814 44.8963 23.3588C44.739 21.4187 44.0635 19.5565 42.9403 17.9668C42.7484 17.7055 42.6178 17.5503 42.3585 17.2379C40.7394 15.3024 38.6079 12.8892 36.75 11.2313C35.0963 9.75316 32.828 8.1382 30.8496 6.81929C29.1509 5.68412 28.3016 5.11654 27.1358 4.69595C26.7967 4.5746 26.4519 4.46968 26.1027 4.38154C25.3187 4.18758 24.5551 4.1202 23.4792 4.0957L23.4996 4.61633Z" fill="black" />
        </Svg>

    )
}
export default Jpg