import {useCallback, useContext} from "react";
import {AuthContext} from "../contexes/auth-context";
import {Profile} from "../components";
import {useFocusEffect} from "@react-navigation/native";

export const UserProfile = ({navigation, route}) => {
    useFocusEffect( // Run each time the tab is loaded
        useCallback(() => {
            setCurrentTab('UserProfile')
        }, [setCurrentTab])
    )
    const {_id, setCurrentTab} = useContext(AuthContext)
    return (
        <Profile profileId={_id} selfProfile={true} />
    )
}