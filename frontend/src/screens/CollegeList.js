import {View, Text, ScrollView, StyleSheet, Linking} from "react-native";
import {designChoices} from "../../GlobalConsts";
import {AuthContext} from "../contexes/auth-context";
import {useCallback, useContext, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {GET_COLLEGE_LIST} from "../graphql";
import {useQuery} from "@apollo/client";

const CollegeCard = ({college}) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.name}>{college.name}</Text>
            <Text>College Website: <Text onPress={() => Linking.openURL(college.website)} style={styles.website}>{college.website}</Text></Text>
            <Text>Acceptance Rate: {college.acceptanceRate}%</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: designChoices.offWhite,
        borderRadius: 5,
        padding: 10
    },
    name: {
        fontWeight: "bold",
        fontSize: 18
    },
    website: {
        color: designChoices.secondary
    }
})

export const CollegeList = ({navigation}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const [collegeList, setCollegeList] = useState([])
    const {data, error, loading, refetch} = useQuery(GET_COLLEGE_LIST, {variables: {_id: _id}})
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => {
            setCurrentTab('CollegeList')
            refetch()
        }, [setCurrentTab, refetch])
    )
    useEffect(() => {
        if (!error && !loading) {
            setCollegeList(data.collegeList)
        }
    }, [data]);
    return (
        <View style={{flexGrow: 1, backgroundColor: designChoices.white}}>
            <ScrollView style={{paddingHorizontal: 20}}>
                <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 22, marginVertical: 10}}>Colleges for you</Text>
                {
                    !loading &&
                    (collegeList && collegeList.length > 0) ?
                        <View style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 10}}>
                            {
                                collegeList.map(college =>
                                    <CollegeCard college={college} />
                                )
                            }
                        </View>
                        :
                        <Text style={{textAlign: "center", fontSize: 16}}>No colleges found. Please add more information to your profile</Text>
                }
            </ScrollView>
        </View>
    )
}
