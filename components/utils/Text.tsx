import { StyleSheet, Text } from 'react-native'


type Props = {
    children: string
    className?: string
    weight?: 'regular' | 'semiBold'
}
const StyledText = ({ children, className, weight }: Props) => {
    return (
        <Text style={weight === 'semiBold' ? styles.poppinsSemiBold : styles.poppinsRegular} className={className}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },



})

export default StyledText