import {View, Text} from "react-native";
import {designChoices} from "../../GlobalConsts";
import {AuthContext} from "../contexes/auth-context";
import {useCallback, useContext} from "react";
import {useFocusEffect} from "@react-navigation/native";

export const CollegeList = ({navigation}) => {
    const {setCurrentTab} = useContext(AuthContext)
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => setCurrentTab('CollegeList'), [setCurrentTab])
    )
    return (
        <View style={{flexGrow: 1, backgroundColor: designChoices.white}}>
            <Text>CollegeList</Text>
        </View>
    )
}
