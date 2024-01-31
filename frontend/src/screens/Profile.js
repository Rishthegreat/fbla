/* eslint-disable */
import {View, Text} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useLazyQuery, useQuery} from "@apollo/client";
import {WHOLE_USER_BY_ID} from "../graphql";

export const Profile = ({navigation, route}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState(null)
    const profileId = route.params?.profileId
    const [editMode, setEditMode] = useState(profileId === _id)
    const {loading, data, error} = useQuery(WHOLE_USER_BY_ID, {variables: {_id: profileId}, onCompleted: r => {
        setProfileUser(r.user)
        }, pollInterval: 30000})
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => {
            if (editMode) {
                setCurrentTab('Profile')
            }
        }, [setCurrentTab, editMode])
    )

    return (
        <View>
            {profileUser ? Object.keys(profileUser).map(key => {
                return (
                    <View key={key}>
                        <Text>{key}: {profileUser[key]}</Text>
                    </View>
                )
            }) : null}
            <View>{/* User Information */}
                <View>{/* Name */}

                </View>
                <View>{/* Email */}

                </View>
                <View>{/* School */}

                </View>
                <View>{/* Colleges I'm Thinking About */}

                </View>
            </View>
            <View>
                <View>{/* Classes */}

                </View>
                <View>{/* Test Scores */}

                </View>
                <View>{/* Clubs */}

                </View>
                <View>{/* Extra curriculars */}

                </View>
                <View>{/* Jobs/Internships */}

                </View>
                <View>{/* Performing Arts Experience */}

                </View>
                <View>{/* Community Service */}

                </View>
                <View>{/* Skills */}

                </View>
                <View>{/* Awards */}

                </View>
            </View>
        </View>
    )
}