import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg"

type Props = {
    color?: string
}
const Exit = ({ color }: Props) => {
    return (
        <Svg width="24" height="28" viewBox="0 0 24 28" fill="none" >
            <G clip-path="url(#clip0_89_5212)">
                <Path d="M13 5V13H11V5H8L12 0L16 5L13 5ZM6 4V6.708C4.98166 7.86269 4.31814 9.28669 4.08906 10.8091C3.85997 12.3316 4.07505 13.8878 4.7085 15.291C5.34194 16.6942 6.36683 17.8849 7.66018 18.7201C8.95354 19.5553 10.4604 19.9995 12 19.9995C13.5396 19.9995 15.0465 19.5553 16.3398 18.7201C17.6332 17.8849 18.6581 16.6942 19.2915 15.291C19.9249 13.8878 20.14 12.3316 19.9109 10.8091C19.6819 9.28669 19.0183 7.86269 18 6.708V4C19.2428 4.93066 20.2515 6.13833 20.9459 7.52707C21.6402 8.91581 22.0012 10.4473 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C1.99883 10.4473 2.35977 8.91581 3.05414 7.52707C3.74851 6.13833 4.75717 4.93066 6 4Z" fill={color || "#606060"} stroke="white" stroke-width="0.5" />
            </G>
            <Defs>
                <ClipPath id="clip0_89_5212">
                    <Rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)" />
                </ClipPath>
            </Defs>
        </Svg>

    )
}
export default Exit