import Cancel from '@/assets/icons/Cancel';
import Check from '@/assets/icons/Check';
import Jpg from '@/assets/icons/Jpg';
import Upload from '@/assets/icons/Upload';
import Header from '@/components/header/Header';
import Notice from '@/components/noticeBoard/Notice';
import { useAppContext } from '@/context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Modal from 'react-native-modal';
import axiosInstance from '@/services';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import moment from 'moment';
import { useAuth } from '@/context/AuthContext';

type Props = {};

  
const Screen = (props: Props) => {
    const { authState } = useAuth();
    const companyId = authState?.companyId;

    console.log(companyId, 'auth id');
    

    const { fontSize } = useAppContext();
    const [isVisible, setIsVisible] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<{ url: string, publicId: string }[]>([]);

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dyikojd82/image/upload';

    const fetchImages = async () => {
        console.log('fetching images');
        
        try {
            const response = await axiosInstance.get(`/company/imgurl/${companyId}`);
            console.log(response);
            
            setUploadedImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    useEffect(() => {
        // Fetch images on component mount
        fetchImages();
       
    }, []);

    const timeAgo = (date: moment.MomentInput) => {
        return moment(date).fromNow();
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

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
            setLoading(true);
            const imageToBePosted = result.assets[0];
            let base64Img = `data:image/jpeg;base64,${imageToBePosted.base64}`;
            let data = {
                file: base64Img,
                upload_preset: 'runshift',
            };

            try {
                let response = await fetch(CLOUDINARY_URL, {
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                });

                let responseData = await response.json();
                console.log(responseData);

                if (responseData.secure_url && responseData.public_id) {
                    await axiosInstance.post('/company/imgurlupload', 
                        {
                         url: responseData.secure_url, 
                        publicId: responseData.public_id, 
                        companyId, 
                        bytes: responseData.bytes,
                        created_at: responseData.created_at
                     });
                    // Fetch images again to update the list
                    const fetchImages = async () => {
                        try {
                            const response = await axiosInstance.get(`/company/imgurl/${companyId}`);
                            setUploadedImages(response.data);
                        } catch (error) {
                            console.error('Error fetching images:', error);
                        }
                    };
                    fetchImages();
                } else {
                    console.log('Error uploading image');
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error uploading image:', error);
            }
        }
    };

    const showImageModal = (uri: string) => {
        console.log(uri);
        console.log('Show image in modal:', uri);
        setSelectedImageUri(uri); // Store the clicked image URI
        setIsVisible(true);
    };

    const deleteImage = async () => {
        setShowDelete(!showDelete);
        setLoading(true)
        console.log("image to be deleted");

        const imageToDelete = uploadedImages.find(image => image.url === selectedImageUri);
        console.log(imageToDelete?.publicId);
        
        if (!imageToDelete) return;
    
        try {
            
            const res = await axiosInstance.post('/company/deleteimage', {
                publicId: imageToDelete.publicId
            });
    
            console.log(res);

            console.log("image deleted");
        setLoading(false)          
            fetchImages()
        } catch (error) {
        setLoading(false)

            console.error('Error deleting image from Cloudinary:', error);
        }
    };
    ``

    const handleDeleteImage = (uri: string) => {
        setShowDelete(!showDelete); 
        setSelectedImageUri(uri);
    };

    return (
        <View className="flex-1 justify-between">
            <SafeAreaView className="bg-primary pb-7"></SafeAreaView>

            <Header title="uploads" moreOptions={true} />
            <View className="flex-1 justify-between bg-white px-6">
                <ScrollView
                showsVerticalScrollIndicator={false}
                 contentContainerStyle={{
                    paddingTop: 10,
                }}
                 >
                    {/* Render images here */}
                    {uploadedImages.length !== 0 ? (
                        uploadedImages.map(({ url, created_at, bytes, publicId }: any, index) => (
                            <TouchableOpacity
                                key={index}
                                onLongPress={() => handleDeleteImage(url)}
                                onPress={() => showImageModal(url)}
                                className="flex-row py-3"
                            >
                                <View>
                                    <Jpg />
                                </View>
                                <View className="ml-4">
                                    <Text
                                        className="bg-[#626262] text-white px-3 rounded-lg mb-1 py-2 text-base"
                                        style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}
                                    >
                                        IMG -{publicId.slice(0, 8)}
                                    </Text>
                                    <Text className="text-sm text-[#606060]" style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>
                                        {timeAgo(created_at)}
                                    </Text>
                                    <Text className="text-sm text-[#606060]" style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>
                                        {formatBytes(bytes)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View>
                            <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>No images to show</Text>
                        </View>
                    )}

                    {/* Image modal */}
                    <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
                        <View style={{ backgroundColor: 'white', padding: 2, borderRadius: 8 }}>
                            {selectedImageUri && <Image source={{ uri: selectedImageUri }} style={{ width: '100%', height: 300, borderRadius: 8 }} />}
                        </View>
                    </Modal>
                </ScrollView>
                <TouchableOpacity onPress={pickImage} className=" rounded-xl mb-10 absolute  self-end bottom-0 right-5">
                    <Upload />
                </TouchableOpacity>
            </View>
            {showDelete && (
                <View className="h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className="h-[60%] bottom-0 w-full rounded-t-[20px] justify-center items-center"></View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center px-6">
                        <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className="text-white text-2xl pb-8 -mt-[500px]">
                            Are you sure you want to delete this selected file?
                        </Text>
                        <View className="justify-end flex-row gap-x-[76px]">
                            <TouchableOpacity className="flex-row" onPress={deleteImage}>
                                <Check />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row" onPress={() => setShowDelete(!showDelete)}>
                                <Cancel />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
            {loading && <LoadingSpinner />}
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
});

export default Screen;
