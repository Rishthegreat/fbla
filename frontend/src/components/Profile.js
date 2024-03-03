/* eslint-disable */
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useQuery} from "@apollo/client";
import {WHOLE_USER_BY_ID} from "../graphql";
import {AddProfileSection, CustomButton, ProfileEditSectionView} from "./index";
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

export const Profile = ({profileId, selfProfile}) => {
    const [profileUser, setProfileUser] = useState(null)
    // This profile.js will be rendered for all profiles including your own, and it will automatically switch between the user view and non-user view depending on if the profile's id matches the current logged-in user's id
    const [newProfile, setNewProfile] = useState(true)
    const [addSection, setAddSection] = useState(false)
    const [editSectionType, setEditSectionType] = useState(null)
    const {data, error, loading, refetch} = useQuery(WHOLE_USER_BY_ID, {
        variables: {_id: profileId}, pollInterval: 10000, fetchPolicy: "network-only"
    })

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
        <View style={{paddingHorizontal: 20, width: "100%", backgroundColor: designChoices.white, flexGrow: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: designChoices.white}}>
                {profileUser &&
                    <View>
                        <View style={{marginTop: 10}}>{/* User Information */}
                            <View style={{backgroundColor: "#cecdcd", alignSelf: "flex-start", borderRadius: 55, padding: 5, marginVertical: 5}}>
                                <Icon name={'user'} size={50} />
                            </View>{/* Picture */}
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
                                    profileUser.profile.classes.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.classes.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
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
                                    profileUser.profile.colleges.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.colleges.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
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
                                    profileUser.profile.clubs.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.clubs.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
                                                <Text style={styles.subsectionHeader}>{value.position}</Text>
                                                <Text>{value.name}</Text>
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
                                    profileUser.profile.jobsInternships.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.jobsInternships.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
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
                                    profileUser.profile.communityServices.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.communityServices.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
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
                                    profileUser.profile.awards.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.awards.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
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
                                    profileUser.profile.tests.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.tests.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
                                                <Text style={styles.subsectionHeader}>{value.name}</Text>
                                                <Text>Score: {value.score}</Text>
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
                                    profileUser.profile.activities.map((value, i) => {
                                        return (
                                            <View style={{...styles.sectionChild, ...(i === profileUser.profile.activities.length -1)? {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0} : null}}>
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
        </View>
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
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    editIcon: {
        position: "absolute",
        top: 10,
        right: 10
    },
    subsectionHeader: {
        fontWeight: "bold",
        fontSize: 16,
    },
    sectionChild: {
        marginVertical: 2.5,
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        paddingBottom: 5
    }
})