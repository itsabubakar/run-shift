import { createContext, useContext, useState } from "react";

export enum Role {
    STAFF = "staff",
    ADMIN = "admin"
}

interface AuthProps {
    authState: {
        authenticated: boolean | null,
        role: Role | null,
        username: string | null,
    },
    onLogin: (username: string, password: string) => void,
    onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {


    const [authState, setAuthState] = useState<{
        authenticated: boolean | null;
        role: Role | null;
        username: string | null;
    }>({
        authenticated: null,
        role: null,
        username: null
    })

    const login = (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {

            setAuthState({
                authenticated: true,
                role: Role.ADMIN,
                username
            })


        } else if (username === 'staff' && password === 'staff') {
            setAuthState({
                authenticated: true,
                role: Role.STAFF,
                username
            })

        } else {
            alert('Invalid username or password')
        }
    }

    const logout = async () => {
        setAuthState({
            authenticated: false,
            role: null,
            username: null,
        })
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        authState,
    }

    return <AuthContext.Provider
        value={value}
    >
        {children}
    </AuthContext.Provider>


}
