/* eslint-disable */
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {IconWithText} from "../components";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import {useContext} from "react";
import {AuthContext} from "../contexes/auth-context";

export const TopNav = () => {
    return (
        <View>
            <View>
                <View>
                    <Icon name={'search1'} size={20} color={'#000000'} />
                </View>
            </View>
        </View>
    )
}


export const BottomNav = ({navigation}) => {
    const {currentTab, _id} = useContext(AuthContext)
    const bottomBarList = [
        {navigateTo: 'Homepage', text: 'Home', icon: 'home'},
        {navigateTo: 'MakePost', text: 'Post', icon: 'plus'},
        {navigateTo: 'Profile', text: 'Profile', icon: 'user'},
        {navigateTo: 'AppSettings', text: 'Settings', icon: 'setting'},
        {navigateTo: 'Colleges', text: 'Colleges', icon: 'book'}
    ]
    return (
        <View style={styles.bottom_nav_big_container}>
            <View style={styles.bottom_nav_container}>
                {bottomBarList.map((value, key) => {
                    return (
                        <TouchableOpacity key={key} style={{...styles.tab_container, backgroundColor: currentTab === value.navigateTo ? '#b4b3b3' : designChoices.white}} onPress={() => navigation.navigate(value.navigateTo, value.navigateTo === 'Profile'? {profileId: _id} : null)}>
                            <IconWithText text={value.text} icon={value.icon} textColor={designChoices.almostBlack} />
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottom_nav_container: {
        display: "flex",
        flexDirection: "row",
    },
    bottom_nav_big_container: {
        display: "flex",
        width: '100%',
        borderTopColor: "black",
        borderStyle: "solid",
        borderTopWidth: 0.5
    },
    tab_container : {
        flexBasis: '20%',
        paddingBottom: 7,
        paddingTop: 10
    }
})