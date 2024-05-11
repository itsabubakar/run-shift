import axiosInstance from "@/services";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export enum Role {
    STAFF = "staff",
    ADMIN = "admin"
}

interface AuthProps {
    authState: {
        authenticated: boolean | null,
        role: Role | null,
        username: string | null,
        token: string | null,
    },
    onLogin: (username: string, password: string) => void,
    onSignUp: (username: string, password: string) => void,
    onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {

    useEffect(() => {
        const loadToken = async () => {
            console.log('look fr token');

            const token = await SecureStore.getItemAsync('TOKEN_KEY')

            if (token) {
                console.log('token', token);
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
                setAuthState({
                    authenticated: true,
                    role: Role.ADMIN,
                    username: 'admin',
                    token
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
        username: string | null;
        token: string | null;
    }>({
        authenticated: null,
        role: null,
        username: null,
        token: null,
    })

    const register = async (email: string, password: string) => {
        console.log('register', email, password);

        try {
            const res = await axiosInstance.post(`/users`, { email, password })
            console.log(res);

        } catch (e) {
            return { error: true, msg: (e as any).response.data.message }
        }
    }

    const logged = async (email: string, password: string) => {

        try {
            const res = await axiosInstance.post(`/auth`, { email, password })
            setAuthState({
                authenticated: true,
                role: Role.ADMIN,
                username: email,
                token: res.data.token,
            })
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.token}`

            await SecureStore.setItemAsync('TOKEN_KEY', res.data.token)
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message }
        }
    }

    const login = (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {

            setAuthState({
                authenticated: true,
                role: Role.ADMIN,
                username,
                token: 'token',
            })


        } else if (username === 'staff' && password === 'staff') {
            setAuthState({
                authenticated: true,
                role: Role.STAFF,
                username,
                token: 'token',
            })

        } else {
            alert('Invalid username or password')
        }
    }

    const logout = async () => {
        // delte token from storage
        await SecureStore.deleteItemAsync('TOKEN_KEY')

        // update http header
        axiosInstance.defaults.headers.common.Authorization = ``

        setAuthState({
            authenticated: false,
            role: null,
            username: null,
            token: null,
        })
    }

    const value = {
        onLogin: logged,
        onLogout: logout,
        authState,
        onSignUp: register,

    }

    return <AuthContext.Provider
        value={value}
    >
        {children}
    </AuthContext.Provider>


}
