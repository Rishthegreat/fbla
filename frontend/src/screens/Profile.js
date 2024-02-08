/* eslint-disable */
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useLazyQuery, useQuery} from "@apollo/client";
import {WHOLE_USER_BY_ID} from "../graphql";
import {AddProfileSection, CustomButton} from "../components";
import {designChoices} from "../../GlobalConsts";
import Icon from "react-native-vector-icons/AntDesign";

export const Profile = ({navigation, route}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState(null)
    // This profile.js will be rendered for all profiles including your own, and it will automatically switch between the user view and non-user view depending on if the profile's id matches the current logged-in user's id
    const profileId = route.params?.profileId
    const [selfProfile, setSelfProfile] = useState(profileId === _id)
    const [newProfile, setNewProfile] = useState(true)
    const [addSection, setAddSection] = useState(false)
    const {data, error, loading} = useQuery(WHOLE_USER_BY_ID, {
        variables: {_id: profileId}, pollInterval: 3000
    })
    useFocusEffect( // Run each time the tab is loaded
        useCallback(() => {
            if (selfProfile) {
                setCurrentTab('Profile')
            }
        }, [setCurrentTab, selfProfile])
    )
    useEffect(() => {
        if (!error && !loading) {
            setProfileUser(data.user)
            if (data.user.profile) {
                setNewProfile(false)
            } else {
                setNewProfile(true)
            }
        }
    }, [data, error, loading]);
    return (
        <View>
            {profileUser &&
                <View>
                    <View>{/* User Information */}
                        <View></View>{/* Picture */}
                        <Text>{profileUser.firstName} {profileUser.lastName}</Text>
                        {profileUser.profile?.school && <Text>Student at {profileUser.profile.school.name}</Text>}
                        <Text>Contact: {profileUser.email}</Text>
                        {selfProfile &&
                            <View>
                                <CustomButton text={'Add Information to Section'} onPress={() => setAddSection(true)}/>
                            </View>
                        }
                    </View>
                    {newProfile && selfProfile &&
                        <View>{/* Prompt to set up new profile */}
                            <Text>Finish setting up your profile by adding more sections</Text>
                        </View>
                    }
                    {profileUser.profile?.classes &&
                        <View>{/* Classes taken in school */}

                        </View>
                    }
                    {profileUser.profile?.colleges &&
                        <View style={styles.sectionContainer}>{/* colleges I am interested in */}
                            <Text>Colleges I am Interested in</Text>
                            {
                                profileUser.profile.colleges.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.name}</Text>
                                        </View>
                                    )
                                })
                            }
                            {selfProfile &&
                                <TouchableOpacity style={styles.editIcon}>
                                    <Icon name='edit' size={20} />
                                </TouchableOpacity>
                            }
                        </View>
                    }
                    {profileUser.profile?.clubs &&
                        <View>{/* Clubs */}

                        </View>
                    }

                    {profileUser.profile?.jobsInternships &&
                        <View>{/* Jobs and Internships */}

                        </View>
                    }

                    {profileUser.profile?.communityServices &&
                        <View>{/* Community Service */}

                        </View>
                    }

                    {profileUser.profile?.awards &&
                        <View>{/* Awards */}

                        </View>
                    }

                    {profileUser.profile?.activities &&
                        <View>{/* activities */}

                        </View>
                    }
                    {addSection &&
                        <AddProfileSection setAddSection={setAddSection} profileUser={profileUser}/>
                    }
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: designChoices.offWhite,
        borderRadius: 3,
        padding: 10,
        position: "relative"
    },
    editIcon: {
        position: "absolute",
        top: 10,
        right: 10
    }
})