/* eslint-disable */
import {View, Text} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useLazyQuery} from "@apollo/client";
import {PROFILE_BY_ID} from "../graphql";

export const Profile = ({navigation}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const [profileQuery] = useLazyQuery(PROFILE_BY_ID)
    const [profile, setProfile] = useState(null)
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => {
            setCurrentTab('Profile')
            profileQuery({variables: {_id}, onCompleted: r => {
                    setProfile(r.user.profile)
                }})
        }, [])
    )
    return (
        <View>
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