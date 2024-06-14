import Cancel from '@/assets/icons/Cancel'
import Check from '@/assets/icons/Check'
import Jpg from '@/assets/icons/Jpg'
import Upload from '@/assets/icons/Upload'
import Header from '@/components/header/Header'
import Notice from '@/components/noticeBoard/Notice'
import { useAppContext } from '@/context/AppContext'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer'
import Modal from 'react-native-modal';
import axios from 'axios'
import axiosInstance from '@/services'

type Props = {}
const Screen = (props: Props) => {
    const { fontSize } = useAppContext()
    const [isVisible, setIsVisible] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
    const [image, setImage] = useState<any>(null);

    let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dyikojd82/image/upload';

    const pickImage = async () => {
        console.log('Image picker opened');
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            console.log('Image picked');
            const imageToBePosted = result.assets[0];
            console.log(imageToBePosted.uri);

            let base64Img = `data:image/jpeg;base64,${imageToBePosted.base64}`;
            console.log(base64Img);

            let data = {
                "file": base64Img,
                "upload_preset": "runshift",
            };

            try {
                let response = await fetch(CLOUDINARY_URL, {
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json',
                    },
                    method: 'POST',
                });

                let responseData = await response.json();
                console.log(responseData);

                if (responseData.secure_url) {
                    setImage(responseData.secure_url);
                    setSelectedImages(prevImages => [...prevImages, responseData.secure_url]);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };






    const showImageModal = (uri: string) => {
        console.log('Show image in modal:', uri);
        setSelectedImageUri(uri); // Store the clicked image URI
        setIsVisible(true);

    };

    const deleteImage = () => {
        setShowDelete(!showDelete)

        setSelectedImages(currentImages => currentImages.filter(imageUri => imageUri !== selectedImageUri));
    };

    const handleDeleteImage = (uri: string) => {
        setShowDelete(!showDelete)
        setSelectedImageUri(uri)
    }



    console.log(selectedImages);


    return (
        <View className="flex-1   justify-between">
            <SafeAreaView className='bg-primary pb-7'>
            </SafeAreaView>


            <Header title='uploads'
                moreOptions={true}
            />
            <View className='flex-1 justify-between bg-white px-6'>

                <View className='pt-10 gap-y-10'>
                    {/* Render images here */}
                    {selectedImages.length !== 0 ? selectedImages.map((uri, index) => (

                        <TouchableOpacity key={index} onLongPress={() => handleDeleteImage(uri)} onPress={() => showImageModal(uri)} className='flex-row'>
                            <View>
                                <Jpg />
                            </View>
                            <View className='ml-4'>

                                <Text className='bg-[#626262] text-white px-3 rounded-lg mb-1 py-2 text-base' style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} >IMG -2e22e4-22</Text>
                                <Text className='text-sm text-[#606060]' style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>A few seconds ago</Text>
                                <Text className='text-sm text-[#606060]' style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>45.78kb</Text>
                            </View>
                        </TouchableOpacity>
                    )) : <View className=''>
                        <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>No images to show</Text>

                    </View>}

                    {/* Image modal */}
                    <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 8 }}>
                            {selectedImageUri && (
                                <Image source={{ uri: selectedImageUri }} style={{ width: '100%', height: 300, borderRadius: 8 }} />
                            )}
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity onPress={pickImage} className=' items-end rounded-xl  mb-10'>
                    <Upload />
                </TouchableOpacity>
            </View>
            {
                showDelete && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className=" h-[60%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                    </View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center px-6">
                        <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className="text-white text-2xl pb-8  -mt-[500px] ">Are you sure you want to delete this selected file ?</Text>
                        <View className='justify-end flex-row gap-x-[76px]'>
                            <TouchableOpacity className='flex-row ' onPress={deleteImage}>
                                <Check />
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-row ' onPress={() => setShowDelete(!showDelete)}>
                                <Cancel />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            }
            <StatusBar style="auto" />
        </View>
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

export default Screen