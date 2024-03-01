/* eslint-disable */
import {Image, StyleSheet, TouchableOpacity, View, Text, TextInput, Keyboard, Animated} from "react-native";
import {IconWithText} from "../components";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import Logo from '../../assets/images/Logo.png'
import {useLazyQuery} from "@apollo/client";
import {SEARCH} from "../graphql";
import {ProfileContext} from "../contexes/ProfileContext";

const UserSearchResult = ({user}) => {
    const {setOtherProfileId} = useContext(ProfileContext)
    return (
        <View style={stylesTopNav.userSearchContainer}>
            <Icon name={'user'} size={15} color={designChoices.almostBlack} />
            <Text>{user.firstName} {user.lastName}</Text>
            <TouchableOpacity onPress={() => setOtherProfileId(user._id)} style={{display: "flex", flexDirection: "row", gap: 5, marginLeft: "auto", alignItems: "center"}}>
                <Text style={{color: designChoices.secondary}}>View Profile</Text>
                <Icon name={'arrowright'} color={designChoices.secondary} size={15} />
            </TouchableOpacity>
        </View>
    )
}


const PostSearchResult = ({post}) => {
    return (
        <View>
            <Text>{post.title}</Text>
        </View>
    )
}

const ResultView = ({visibility, searchResults}) => {
    const [fadeAnim] = useState(new Animated.Value(0))
    const animatedViewRef = useRef(null)
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => animatedViewRef.current?.setNativeProps({display: "none"}))
    }
    useEffect(() => {
        if (visibility) {
            animatedViewRef.current?.setNativeProps({display: "flex"})
            fadeIn()
        } else {
            fadeOut()
        }
    }, [visibility])
    return (
        <Animated.View ref={animatedViewRef} style={{...stylesTopNav.resultView, opacity: fadeAnim}}>
            <View>
                <Text style={stylesTopNav.resultTitleText}>People</Text>
                {searchResults.users?.length > 0 ?
                    searchResults.users.map((user, key) => (
                        <UserSearchResult user={user} key={key} />
                    )) :
                    <Text>No Users Found</Text>
                }
            </View>
            <View>
                <Text style={stylesTopNav.resultTitleText}>Posts</Text>
                {searchResults.posts?.length > 0 ?
                    searchResults.posts.map((post, key) => (
                        <PostSearchResult post={post} key={key} />
                    )) :
                    <Text>No Posts Found</Text>
                }
            </View>
        </Animated.View>
    )
}


export const TopNav = () => {
    const [searchText, setSearchText] = useState("")
    const textInputRef = useRef(null)
    const [searchQuery] = useLazyQuery(SEARCH)
    const {_id} = useContext(AuthContext)
    const [showResultView, setShowResultView] = useState(false)
    const [searchResults, setSearchResults] = useState({
        users: [],
        posts: []
    })
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
        if (value !== null && value !== "") {
            searchQuery({variables: {_id: _id, searchTerm: value, filters: null}})
                .then(r => {
                    console.log(r.data.search)
                    setSearchResults(prevState => {
                        return {users: r.data.search.users, posts: r.data.search.posts}
                    })
                })
        } else {
            setSearchResults({users: [], posts: []})
        }
    }
    return (
        <View>
            <View style={stylesTopNav.root}>
                <Image source={Logo} resizeMode={"contain"} style={stylesTopNav.logoStyle} />
                <TouchableOpacity onPress={startSearching} style={stylesTopNav.searchContainer}>
                    <Icon name='search1' size={20} color={designChoices.almostBlack} />
                    <TextInput onBlur={() => setShowResultView(false)} onFocus={() => setShowResultView(true)} ref={textInputRef} value={searchText} onChangeText={searchDataBaseAndUpdateText} multiline={false} placeholder={'Search'} style={{padding: 0}} />
                </TouchableOpacity>
            </View>
            <ResultView searchResults={searchResults} visibility={showResultView} />
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
    },
    resultView: {
        position: "absolute",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: designChoices.white,
        borderBottomWidth: 0.5,
        borderStyle: "solid",
        borderBottomColor: "gray",
        top: 60.5,
        display: "none"
    },
    resultTitleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 5
    },
    userSearchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: designChoices.offWhite,
        padding: 7,
        borderRadius: 3
    }
})

export const BottomNav = ({navigation}) => {
    const {currentTab, _id} = useContext(AuthContext)
    const bottomBarList = [
        {navigateTo: 'Homepage', text: 'Home', icon: 'home'},
        {navigateTo: 'MakePost', text: 'Post', icon: 'plus'},
        {navigateTo: 'UserProfile', text: 'Profile', icon: 'user'},
        {navigateTo: 'AppSettings', text: 'Settings', icon: 'setting'},
        {navigateTo: 'Colleges', text: 'Colleges', icon: 'book'}
    ]
    return (
        <View style={styles.bottom_nav_big_container}>
            <View style={styles.bottom_nav_container}>
                {bottomBarList.map((value, key) => {
                    return (
                        <TouchableOpacity key={key} style={{...styles.tab_container, backgroundColor: designChoices.white}} onPress={() => navigation.navigate(value.navigateTo)}>
                            <IconWithText text={value.text} icon={value.icon} textColor={currentTab === value.navigateTo ? designChoices.secondary : designChoices.almostBlack} color={currentTab === value.navigateTo ? designChoices.secondary : designChoices.almostBlack} />
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
        borderTopColor: "gray",
        borderStyle: "solid",
        borderTopWidth: 0.5
    },
    tab_container : {
        flexBasis: '20%',
        paddingBottom: 7,
        paddingTop: 10
    }
})