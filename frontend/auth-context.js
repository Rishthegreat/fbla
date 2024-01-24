/* eslint-disable */
import {createContext, useEffect, useState} from "react";
import {MMKV} from "react-native-mmkv";

export const AuthContext = createContext()
const storage = new MMKV()
export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const login = () => {
        setIsLoading(true)
        setUserToken('asdkfadfasdfkjh') //later use actual token
        storage.set('userToken', 'asdkfadfasdfkjh')
        setIsLoading(false)
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        storage.delete('userToken')
        setIsLoading(false)
    }

    const IsLoggedIn = () => {
        try {
            setIsLoading(true)
            if (storage.contains('userToken')) {
                let userToken = storage.getString('userToken')
                setUserToken(userToken)
            } else {
                setUserToken(null)
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
        <AuthContext.Provider value={{login, logout, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}
