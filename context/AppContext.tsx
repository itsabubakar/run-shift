import axiosInstance from "@/services";
import { createContext, useContext, useState } from "react";

interface AppProps {
    emailFilter: string;
    setEmailFilter: React.Dispatch<React.SetStateAction<string>>;

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
    showFontSlider: boolean;
    setShowFontSlider: React.Dispatch<React.SetStateAction<boolean>>,
    showHorizontalCalendar: boolean,
    setShowHorizontalCalendar: React.Dispatch<React.SetStateAction<boolean>>,
    pushNotifications: boolean,
    setPushNotifications: React.Dispatch<React.SetStateAction<boolean>>,
    hideReadMessages: boolean,
    setHideReadMessages: React.Dispatch<React.SetStateAction<boolean>>,
    refreshKey: number,
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>,
    showAllShiftsBoolean: boolean,
    setShowAllShiftsBoolean: React.Dispatch<React.SetStateAction<boolean>>,
    showRequest: boolean,
    setShowRequest: React.Dispatch<React.SetStateAction<boolean>>,
    showRequestCheckBox: boolean,
    setShowRequestCheckBox: React.Dispatch<React.SetStateAction<boolean>>,
}

const AppContext = createContext<Partial<AppProps>>({})

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppProvider = ({ children }: any) => {

    const [showAllShiftsBoolean, setShowAllShiftsBoolean] = useState(false)
    const [showRequest, setShowRequest] = useState(false)
    const [showRequestCheckBox, setShowRequestCheckBox] = useState(false)

    const [showHeaderCalendar, setShowHeaderCalendar] = useState(false)
    const [emailFilter, setEmailFilter] = useState('');

    const [showHorizontalCalendar, setShowHorizontalCalendar] = useState(true)
    const [showAllShifts, setShowAllShifts] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showMoreOptions, setMoreOptions] = useState(false)
    const [fontSize, setFontSize] = useState(14); // Default font size
    const [showProfilePicture, setShowProfilePicture] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showFontSlider, setShowFontSlider] = useState(false)
    const [pushNotifications, setPushNotifications] = useState(false)
    const [hideReadMessages, setHideReadMessages] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0);

    const value = {
        emailFilter,
        setEmailFilter,
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
        setShowProfilePicture,
        showFontSlider,
        setShowFontSlider,
        showHorizontalCalendar,
        setShowHorizontalCalendar,
        pushNotifications,
        setPushNotifications,
        hideReadMessages,
        setHideReadMessages,
        refreshKey,
        setRefreshKey,
        showAllShiftsBoolean, 
        setShowAllShiftsBoolean,
        showRequest,
        setShowRequest,
        showRequestCheckBox,
        setShowRequestCheckBox
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
