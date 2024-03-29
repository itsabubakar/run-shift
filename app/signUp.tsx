import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Rect } from 'react-native-svg';



export default function SignUpScreen() {
    return (
        <SafeAreaView className="flex-1  bg-primary justify-between ">
            <View className="flex-col flex-1 justify-center items-center">
                <Text className='max-w-[308px] w-full pb-8'>Icon</Text>
                <TextInput className='border border-white rounded-2xl py-2 px-3 placeholder:text-lg  max-w-[308px] min-w-[308px]' placeholder='Email address' />
                <TextInput className='mt-5 border border-white rounded-2xl py-2 px-3 placeholder:text-lg e max-w-[308px] min-w-[308px]' placeholder='Password' />
                <View className='pt-8 pb-10 max-w-[308px] w-full'>
                    <Text className='text-white text-left '>Keep me logged in</Text>
                </View>
                <Link className='text-center bg-secondary py-4 rounded-2xl max-w-[308px] min-w-[308px]' href={'/'}>Login</Link>
                <View className='pt-8 pb-10 max-w-[308px] w-full'>
                    <Text className='text-white '>Forgotten your password?</Text>
                </View>
            </View>
            <View className='flex justify-end items-end pb-8'>
                <Link href={'/options'} asChild>
                    <TouchableOpacity>
                        <Svg width="100" height="100">
                            <Rect x="0.5" y="0.5" width="59" height="53" rx="15.5" fill="#A4A705" stroke="#A4A705" />
                        </Svg>
                    </TouchableOpacity>
                </Link>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>

    );
}


