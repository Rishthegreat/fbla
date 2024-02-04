/* eslint-disable */
import {View, Text, TouchableOpacity} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useLazyQuery, useQuery} from "@apollo/client";
import {WHOLE_USER_BY_ID} from "../graphql";
import {AddProfileSection, CustomButton} from "../components";

export const Profile = ({navigation, route}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState(null)
    // This profile.js will be rendered for all profiles including your own, and it will automatically switch between the user view and non-user view depending on if the profile's id matches the current logged-in user's id
    const profileId = route.params?.profileId
    const [selfProfile, setSelfProfile] = useState(profileId === _id)
    const [newProfile, setNewProfile] = useState(true)
    const [addSection, setAddSection] = useState(false)
    const {refetch} = useQuery(WHOLE_USER_BY_ID, {
        variables: {_id: profileId}, onCompleted: r => {
            setProfileUser(r.user)
            //console.log(r.user)
            if (r.user.profile) {
                setNewProfile(false)
            } else {
                setNewProfile(true)
            }
        }, pollInterval: 5000
    })
    useFocusEffect( // Run each time the tab is loaded
        useCallback(() => {
            refetch().then((r) => console.log(r))
            if (selfProfile) {
                setCurrentTab('Profile')
            }
        }, [setCurrentTab, selfProfile, refetch])
    )
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
                                <CustomButton text={'Add Section'} onPress={() => setAddSection(true)}/>
                            </View>
                        }
                    </View>
                    {newProfile && selfProfile &&
                        <View>{/* Prompt to set up the new profile */}
                            <Text>Finish setting up your profile by adding more sections</Text>
                        </View>
                    }
                    {profileUser.classes &&
                        <View>{/* Classes taken in school */}

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