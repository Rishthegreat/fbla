import {createContext, useState} from "react";

export const ProfileContext = createContext()
export const ProfileProvider = ({children}) => {
    const [otherProfileId, setOtherProfileId] = useState(null)
    return (
        <ProfileContext.Provider value={{setOtherProfileId, otherProfileId}}>
            {children}
        </ProfileContext.Provider>
    )
}