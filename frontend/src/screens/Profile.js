/* eslint-disable */
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useQuery} from "@apollo/client";
import {WHOLE_USER_BY_ID} from "../graphql";
import {AddProfileSection, CustomButton, ProfileEditSectionView} from "../components";
import {designChoices} from "../../GlobalConsts";
import Icon from "react-native-vector-icons/AntDesign";

const ProfileView = ({children, selfProfile, sectionType, setEditSectionType}) => {
    return (
        <View style={styles.sectionContainer}>
            {children}
            {selfProfile &&
                <TouchableOpacity style={styles.editIcon} onPress={() => setEditSectionType(sectionType)}>
                    <Icon name='edit' size={20} />
                </TouchableOpacity>
            }
        </View>
    )
}

export const Profile = ({navigation, route}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState(null)
    // This profile.js will be rendered for all profiles including your own, and it will automatically switch between the user view and non-user view depending on if the profile's id matches the current logged-in user's id
    const profileId = route.params?.profileId
    const [selfProfile, setSelfProfile] = useState(profileId === _id)
    const [newProfile, setNewProfile] = useState(true)
    const [addSection, setAddSection] = useState(false)
    const [editSectionType, setEditSectionType] = useState(null)
    const {data, error, loading, refetch} = useQuery(WHOLE_USER_BY_ID, {
        variables: {_id: profileId}, pollInterval: 10000
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
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: designChoices.white}}>
            {profileUser &&
                <View>
                    <View style={{marginTop: 10}}>{/* User Information */}
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
                        <ProfileView selfProfile={selfProfile} sectionType='classes' setEditSectionType={setEditSectionType}>{/* Classes taken in school */}
                            <Text style={styles.sectionHeader}>Classes I am Currently Taking</Text>
                            {
                                profileUser.profile.classes.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.name}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }
                    {profileUser.profile?.colleges &&
                        <ProfileView selfProfile={selfProfile} sectionType='colleges' setEditSectionType={setEditSectionType}>{/* colleges I am interested in */}
                            <Text style={styles.sectionHeader}>Colleges I am Interested in</Text>
                            {
                                profileUser.profile.colleges.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.name}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }
                    {profileUser.profile?.clubs &&
                        <ProfileView selfProfile={selfProfile} sectionType='clubs' setEditSectionType={setEditSectionType}>
                            <Text style={styles.sectionHeader}>Clubs I Participate In</Text>
                            {
                                profileUser.profile.clubs.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.name}</Text>
                                            <Text>{value.position}</Text>
                                            <Text>{value.description}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }

                    {profileUser.profile?.jobsInternships &&
                        <ProfileView selfProfile={selfProfile} sectionType='jobsInternships' setEditSectionType={setEditSectionType}>
                            <Text style={styles.sectionHeader}>Jobs and Internships</Text>
                            {
                                profileUser.profile.jobsInternships.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.position}</Text>
                                            <Text>{value.company}</Text>
                                            <Text>{value.description}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }

                    {profileUser.profile?.communityServices &&
                        <ProfileView selfProfile={selfProfile} sectionType='communityServices' setEditSectionType={setEditSectionType}>
                            <Text style={styles.sectionHeader}>Community Service</Text>
                            {
                                profileUser.profile.communityServices.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.position}</Text>
                                            <Text>{value.organization}</Text>
                                            <Text>{value.hours}</Text>
                                            <Text>{value.description}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }

                    {profileUser.profile?.awards &&
                        <ProfileView selfProfile={selfProfile} sectionType='awards' setEditSectionType={setEditSectionType}>
                            <Text style={styles.sectionHeader}>Awards</Text>
                            {
                                profileUser.profile.awards.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.name}</Text>
                                            <Text>{value.organization}</Text>
                                            <Text>{value.description}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }

                    {profileUser.profile?.tests &&
                        <ProfileView selfProfile={selfProfile} sectionType='tests' setEditSectionType={setEditSectionType}>
                            <Text style={styles.sectionHeader}>Tests I have Taken</Text>
                            {
                                profileUser.profile.tests.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.name}</Text>
                                            <Text>{value.score}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }

                    {profileUser.profile?.activities &&
                        <ProfileView selfProfile={selfProfile} sectionType='activities' setEditSectionType={setEditSectionType}>
                            <Text style={styles.sectionHeader}>Other Activities</Text>
                            {
                                profileUser.profile.activities.map(value => {
                                    return (
                                        <View>
                                            <Text>{value.name}</Text>
                                            <Text>{value.description}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ProfileView>
                    }
                    {addSection &&
                        <AddProfileSection refetch={refetch} setAddSection={setAddSection} profileUser={profileUser}/>
                    }
                    {editSectionType &&
                        <ProfileEditSectionView refetch={refetch} editSectionType={editSectionType} setEditSectionType={setEditSectionType} profileUser={profileUser} />
                    }
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: designChoices.offWhite,
        borderRadius: 3,
        padding: 10,
        position: "relative",
        marginVertical: 5
    },
    sectionHeader: {
        fontSize: 17,
        fontWeight: "bold"
    },
    editIcon: {
        position: "absolute",
        top: 10,
        right: 10
    }
})