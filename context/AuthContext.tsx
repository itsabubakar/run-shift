import axiosInstance from "@/services"
import { createContext, useContext, useEffect, useState } from "react";
// import * as SecureStore from 'expo-secure-store';

export enum Role {
    STAFF = "staff",
    MANAGER = "manager"
}

interface AuthProps {
    authState: {
        authenticated: boolean | null,
        role: Role | null,
        email: string | null,
        token: string | null,
        firstName: string | null,
        companyId: string | null
    },
    onLogout: () => void;
    setAuthState: React.Dispatch<React.SetStateAction<{
        authenticated: boolean | null,
        role: Role | null,
        email: string | null,
        token: string | null,
        firstName: string | null,
        companyId: string | null


    }>>
}

const AuthContext = createContext<Partial<AuthProps>>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {

    useEffect(() => {
        const loadToken = async () => {
            console.log('look fr token');

            const token = 'token'

            if (token) {
                console.log('token', token);
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
                setAuthState({
                    authenticated: true,
                    role: Role.MANAGER,
                    email: '',
                    token,
                    firstName: '',
                    companyId: ''

                })
            } else {
                console.log('no token found');

            }
        }

        loadToken()

    }, [])


    const [authState, setAuthState] = useState<{
        authenticated: boolean | null;
        role: Role | null;
        email: string | null;
        token: string | null;
        firstName: string | null;
        companyId: string | null

    }>({
        authenticated: null,
        role: null,
        email: null,
        token: null,
        firstName: null,
        companyId: null

    })







    const logout = async () => {
        // delte token from storage
        // await SecureStore.deleteItemAsync('TOKEN_KEY')

        // update http header
        axiosInstance.defaults.headers.common.Authorization = ``

        setAuthState({
            authenticated: false,
            role: null,
            email: null,
            token: null,
            firstName: null,
            companyId: null

        })
    }

    const value = {
        onLogout: logout,
        authState,
        setAuthState,

    }

    return <AuthContext.Provider
        value={value}
    >
        {children}
    </AuthContext.Provider>


}
