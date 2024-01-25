/* eslint-disable */

import {useContext} from "react";
import {AuthContext} from "../../auth-context";
import {CustomButton} from "../components";
import {View} from "react-native";

export const AppSettings = ({navigation}) => {
    const {logout} = useContext(AuthContext)
    return (
        <View>
            <CustomButton text={'Log Out'} onPress={logout} />
        </View>
    )
}