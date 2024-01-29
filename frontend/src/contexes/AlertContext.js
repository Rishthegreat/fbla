/* eslint-disable */

import {createContext, useState} from "react";

const initialState = {
    text:'',
    type:''
}

export const AlertContext = createContext({
    ...initialState,
    setAlert: () => {},
})

export const AlertProvider = ({children}) => {
    const [text, setText] = useState('');
    const [type, setType] = useState('');

    const setAlert = (text, type) => {
        setText(text);
        setType(type);
    };
    return (
        <AlertContext.Provider value={{text, type, setAlert}}>
            {children}
        </AlertContext.Provider>
    )
}
