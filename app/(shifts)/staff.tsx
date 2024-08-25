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
import { useAppContext } from '@/context/AppContext';

type Props = {};






const Screen = (props: Props) => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { authState } = useAuth();
    const [offsetY, setOffsetY] = useState(0);
    const { refreshKey } = useAppContext()


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

    // const onRefresh = useCallback(async () => {
    //     setRefreshing(true);
    //     await fetchStaff();
    //     setRefreshing(false);
    // }, [fetchStaff]);

    useEffect(() => {
        console.log('staff screen mounted');
        fetchStaff();
    }, [fetchStaff, refreshKey]);

   
    const renderItem = ({ item }: { item: { firstName: string, email: string } }) => <Staff {...item} />;

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="bg-primary pb-7"></SafeAreaView>
            <Header title="Staff" />

            <View className="flex-1">
                


                <FlatList
                    data={staff}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    // refreshing={refreshing}
                    // onRefresh={onRefresh}
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
