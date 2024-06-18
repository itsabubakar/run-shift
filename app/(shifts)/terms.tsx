import Header from '@/components/header/Header'
import { useAppContext } from '@/context/AppContext'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    const { fontSize } = useAppContext()
    return (
        <SafeAreaView className="flex-1 bg-primary ">

            <Header
                title='terms and conditions'
                moreOptions={true}
            />

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
            >
                <View className=' px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pb-4'>Welcome to Run Shift. These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with the Run Shift mobile application (the "Service") operated by Pedagogic Hub ("us", "we", or "our").</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base'>Please read these Terms and Conditions carefully before using our Run Shift app.</Text>

                </View>

                {/* Terms */}

                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>1. Acceptance of Terms</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>By downloading, accessing, or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</Text>
                </View>

                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>2. User Accounts</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>To use certain features of the Service, you may be required to create an account. You must provide accurate, current, and complete information during the registration process and keep your account information updated. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.</Text>
                </View>

                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>3. Use of the Service</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2 pb-1'>You agree not to use the Service for any illegal or unauthorized purpose.</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2 pb-1'>You must not, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>You agree to use the Service only for lawful purposes.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>4. Content</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>You are responsible for the content you post on the Service, including its legality, reliability, and appropriateness. By posting content on the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>5. Intellectual Property</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>The Service and its original content, features, and functionality are and will remain the exclusive property of Pedagogic Hub and its licensors. The Service is protected by copyright, trademark, and other laws of both your country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Pedagogic Hub.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>6. Termination</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>7. Limitation of Liability</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>In no event shall Pedagogic Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Service; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.

                    </Text>
                </View>

                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>8. Changes</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

                    </Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>9. Contact Us</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>If you have any questions about these Terms, please contact us at info@pedagogichub.com.

                    </Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base'>By using Run Shift, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.



                    </Text>
                </View>

            </ScrollView>





            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
        lineHeight: 24
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
})
export default Screen