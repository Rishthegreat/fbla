/* eslint-disable */
import {Image, StyleSheet, TouchableOpacity, View, Text, TextInput, Keyboard} from "react-native";
import {IconWithText} from "../components";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import Logo from '../../assets/images/Logo.png'


export const TopNav = () => {
    const [searchText, setSearchText] = useState("")
    const textInputRef = useRef(null)
    const startSearching = () => {
        textInputRef.current.focus()
    }
    const keyboardHideCallback = () => {
        textInputRef.current.blur?.()
    }

    useEffect(() => {
        const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardHideCallback);

        return () => {
            keyboardDidHideSubscription?.remove();
        };
    }, []);
    const searchDataBaseAndUpdateText = (value) => {
        setSearchText(value)
        // Implement a search and query to backend for new data
    }
    return (
        <View style={stylesTopNav.root}>
            <Image source={Logo} resizeMode={"contain"} style={stylesTopNav.logoStyle} />
            <TouchableOpacity onPress={startSearching} style={stylesTopNav.searchContainer}>
                <Icon name='search1' size={20} color={designChoices.almostBlack} />
                <TextInput ref={textInputRef} value={searchText} onChangeText={searchDataBaseAndUpdateText} multiline={false} placeholder={'Search'} style={{padding: 0}} />
            </TouchableOpacity>
        </View>
    )
}

const stylesTopNav = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: "gray",
        borderStyle: "solid",
        borderBottomWidth: 0.5,
        gap: 15,
        backgroundColor: designChoices.white
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: designChoices.offWhite,
        padding: 6,
        borderRadius: 3,
        flex: 1,
        gap: 5
    },
    logoStyle: {
        width: 40,
        height: 40
    }
})

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