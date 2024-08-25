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
                title='privacy policy'
                moreOptions={true}
            />

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
            >
                <View className=' px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pb-4'>This Privacy Policy describes how Logos360 ("we," "us," or "our") collects, uses, and discloses your information through our run shift app (the "App").</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base'>Please read these carefully before using our Run Shift app.</Text>

                </View>

                {/* Terms */}

                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>1. Information We Collect</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2 pb-1'>User Information: We collect user information such as your name, email address, and phone number (optional) when you register for an account.</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>Usage Data: We collect usage data such as how you use the App, including the features you access, the frequency of your use, and the device you use to access the App.</Text>
                </View>

                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>2. How We Use Your Information</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>We collect and use your information to operate the run shift, manage your account, send you updates, improve our services, and comply with legal obligations.</Text>
                </View>

                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>3. Sharing Your Information</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2 pb-1'>We may share your information with third-party service providers who help us operate the App, such as data storage providers and analytics providers. We will only share your information with these providers to the extent necessary to perform their services.</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2 pb-1'>We will not share your information with any third-party for marketing purposes without your consent.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>4. Data Security</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage is ever completely secure. We cannot guarantee the security of your information.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>5. Your Choices</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>You can access and update your information in the App settings.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>6. Children's Privacy</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>Our App is not directed to children under the age of 13. We do not knowingly collect information from children under 13. If you are a parent or guardian and you believe your child has provided us with information, please contact us. We will take steps to remove the information from our servers.</Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>7. Changes to This Privacy Policy</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the App.

                    </Text>
                </View>


                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 4 }]} className='text-white text-base pb-2'>8. Contact Us</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base pl-2'>If you have any questions about these Terms, please contact us at info@pedagogichub.com.

                    </Text>
                </View>
                <View className='pt-4 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base'>This Privacy Policy is effective as of June 18, 2024.



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