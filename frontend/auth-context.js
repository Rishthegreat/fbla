/* eslint-disable */
import {createContext, useEffect, useState} from "react";
import MMKVStorage, {MMKVLoader, useMMKVStorage} from "react-native-mmkv-storage";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const storage = new MMKVLoader().initialize()
    const [userToken, setUserToken] = new useMMKVStorage('userToken', storage, null)
    const [isLoading, setIsLoading] = useState(false)
    const login = () => {
        setIsLoading(true)
        setUserToken('asdkfadfasdfkjh') //later use actual token
        setIsLoading(false)
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{login, logout, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}
