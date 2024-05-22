import axiosInstance from "@/services"
import { createContext, useContext, useEffect, useState } from "react";


interface AppProps {
    showHeaderCalendar: boolean,
    setShowHeaderCalendar: React.Dispatch<React.SetStateAction<boolean>>

}

const AppContext = createContext<Partial<AppProps>>({})

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppProvider = ({ children }: any) => {




    const [showHeaderCalendar, setShowHeaderCalendar] = useState(false)

    const value = {
        showHeaderCalendar,
        setShowHeaderCalendar

    }

    return <AppContext.Provider
        value={value}
    >
        {children}
    </AppContext.Provider>


}
