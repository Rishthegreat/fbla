/* eslint-disable */

import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useAlert} from "../hooks/useAlert";
import {designChoices} from "../../GlobalConsts";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_POSTS} from "../graphql";
import {Post, TopNav} from "../components";


export const Homepage = ({navigation}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const [page, setPage] = useState(null)
    const [posts, setPosts] = useState([])
    const {data, error, loading, refetch} = useQuery(GET_POSTS, {variables: {_id: _id, page: page}, onError: (e) => console.log(JSON.stringify(e, null, 2)), fetchPolicy: 'network-only'})
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => {
            setCurrentTab('Homepage')
            refetch()
        }, [setCurrentTab, refetch])
    )
    useEffect(() => {
        if (!error && !loading) {
            setPosts(prev => {
                let newPrev = [...prev]
                for (let i = 0; i < data.posts.length; i++) {
                    let postWithId = prev.filter(p => p['_id'] === data.posts[i]['_id'])
                    if (postWithId.length < 1) {
                        newPrev.push(data.posts[i])
                    }
                }
                newPrev.sort((a, b)=> new Date(b.timestamp) - new Date(a.timestamp))
                return newPrev
            })
        }
    }, [data]);
    return (
        <View>
            <View style={styles.topNav}>
                <TopNav />
            </View>
            <ScrollView style={styles.root}>
                <View style={{paddingHorizontal: 20, width: "100%", backgroundColor: designChoices.white, flexGrow: 1}}>
                    <View>
                        {posts && posts.map((post) => (
                            <Post postData={post} navigation={navigation} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        backgroundColor: designChoices.white,
        marginTop: 60.5
    },
    topNav: {
        zIndex: 1,
        height: 60.5,
        overflow: "hidden",
        position: "absolute",
        width: "100%"
    }
})