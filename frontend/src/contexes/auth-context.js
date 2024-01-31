/* eslint-disable */
import {createContext, useEffect, useState} from "react";
import {MMKV} from "react-native-mmkv";

export const AuthContext = createContext()
const storage = new MMKV()
export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentTab, setCurrentTab] = useState(null)
    const [_id, set_id] = useState(null)
    const login = (token, id) => {
        setIsLoading(true)
        setUserToken(token)
        set_id(id)
        storage.set('_id', id)
        storage.set('userToken', token)
        setIsLoading(false)
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        set_id(null)
        storage.delete('_id')
        storage.delete('userToken')
        setIsLoading(false)
    }

    const IsLoggedIn = () => {
        try {
            setIsLoading(true)
            if (storage.contains('userToken')) {
                setUserToken(storage.getString('userToken'))
                set_id(storage.getString('_id'))
            } else {
                setUserToken(null)
                set_id(null)
            }
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(`error from is logged in ${e}`)
        }
    }

    useEffect(() => {
        IsLoggedIn()
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, userToken, currentTab, setCurrentTab, _id}}>
            {children}
        </AuthContext.Provider>
    )
}
