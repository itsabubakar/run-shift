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
    fontSize: number,
    setFontSize: React.Dispatch<React.SetStateAction<number>>,
    showProfilePicture: boolean,
    setShowProfilePicture: React.Dispatch<React.SetStateAction<boolean>>,
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;


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
    const [fontSize, setFontSize] = useState(14); // Default font size
    const [showProfilePicture, setShowProfilePicture] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date());

    const value = {
        selectedDate,
        setSelectedDate,
        showHeaderCalendar,
        setShowHeaderCalendar,
        showAllShifts,
        setShowAllShifts,
        showFilter,
        setShowFilter,
        showMoreOptions,
        setMoreOptions,
        fontSize,
        setFontSize,
        showProfilePicture,
        setShowProfilePicture

    }

    return <AppContext.Provider
        value={value}
    >
        {children}
    </AppContext.Provider>


}
