/* eslint-disable */
import {View, Text} from "react-native";
import {useCallback, useContext, useEffect} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";

export const Profile = ({navigation}) => {
    const {setCurrentTab} = useContext(AuthContext)
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => setCurrentTab('Profile'), [])
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