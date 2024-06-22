import ProfilePicture from '@/assets/icons/ProfilePicture';
import Header from '@/components/header/Header';
import Staff from '@/components/staff/Staff';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/services';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from "lottie-react-native";
import loader from '../../assets/loader.json'

type Props = {};

// const ball = require('../../assets/ball.json')
const Anim = require('../../assets/Anim.json')
const Anima = require('../../assets/Anima.json')




const Screen = (props: Props) => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { authState } = useAuth();
    const [offsetY, setOffsetY] = useState(0);

    const fetchStaff = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/staff/${authState?.companyId}`);
            console.log(response.data);
            setStaff(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [authState?.companyId]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchStaff();
        setRefreshing(false);
    }, [fetchStaff]);

    useEffect(() => {
        console.log('staff screen mounted');
        fetchStaff();
    }, [fetchStaff]);

    function onScroll(event: { nativeEvent: any; }) {
        const { nativeEvent } = event;
        const { contentOffset } = nativeEvent;
        const { y } = contentOffset;
        setOffsetY(y);
    }
    const renderItem = ({ item }: { item: { firstName: string, email: string } }) => <Staff {...item} />;

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="bg-primary pb-7"></SafeAreaView>
            <Header title="Staff" />

            <View className="flex">
                <View className=' items-center'>
                    <LottieView
                        style={styles.lottieView}
                        source={Anima}
                        autoPlay
                        loop
                    />
                    <LottieView
                        style={styles.lottieView}
                        source={Anim}
                        autoPlay
                        loop
                    />
                    <LottieView
                        style={styles.lottieView}
                        source={Anim}
                        autoPlay
                        loop
                        renderMode={'SOFTWARE'}
                    />
                </View>


                <FlatList
                    data={staff}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    onScroll={onScroll}
                />
            </View>

            {loading && <LoadingSpinner />}
            <StatusBar style="auto" />
        </View>
    );
};

const refreshingHeight = 100;



const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
    lottieView: {
        height: refreshingHeight,
        width: 300,
        // position: 'absolute',
        // top: 5,
        // left: 0,
        // right: 0,
    },
});

export default Screen;
