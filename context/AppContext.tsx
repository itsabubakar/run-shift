import axiosInstance from "@/services"
import { createContext, useContext, useEffect, useState } from "react";


interface AppProps {
    showHeaderCalendar: boolean,
    setShowHeaderCalendar: React.Dispatch<React.SetStateAction<boolean>>,
    showAllShifts: boolean,
    setShowAllShifts: React.Dispatch<React.SetStateAction<boolean>>,
    showFilter: boolean,
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>,
    showMoreOptions: boolean,
    setMoreOptions: React.Dispatch<React.SetStateAction<boolean>>,


}

const AppContext = createContext<Partial<AppProps>>({})

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppProvider = ({ children }: any) => {

    const [showHeaderCalendar, setShowHeaderCalendar] = useState(false)
    const [showAllShifts, setShowAllShifts] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showMoreOptions, setMoreOptions] = useState(false)

    const value = {
        showHeaderCalendar,
        setShowHeaderCalendar,
        showAllShifts,
        setShowAllShifts,
        showFilter,
        setShowFilter,
        showMoreOptions,
        setMoreOptions

    }

    return <AppContext.Provider
        value={value}
    >
        {children}
    </AppContext.Provider>


}
