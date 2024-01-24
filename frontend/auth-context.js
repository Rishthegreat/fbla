/* eslint-disable */
import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(null)
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
