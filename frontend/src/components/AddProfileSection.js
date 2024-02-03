/* eslint-disable */

import {View, Text, TouchableOpacity, Modal, StyleSheet} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {CustomButton} from "./CustomButton";
import {useFocusEffect} from "@react-navigation/native";
import {CustomDropdown} from "./CustomDropdown";
import {root} from "../../.eslintrc";
import {designChoices} from "../../GlobalConsts";

export const AddProfileSection = ({profileUser, setAddSection}) => {
    const [profileSectionsLeft, setProfileSectionsLeft] = useState([])
    const [profileSectionType, setProfileSectionType] = useState(null)
    useFocusEffect(
        useCallback(() => {
            const profileSectionsSchema = { // remember to change this if backend is changed
                school: {items:['name'], title:'School'},
                colleges: {items:['name'], title:'Colleges'},
                classes: {items:['name'], title:'Classes'},
                tests: {items:['name', 'score'], title:'Tests'},
                clubs: {items:['name', 'position', 'description'], title:'Clubs'},
                jobsInternships: {items:['position', 'company', 'description'], title:'Jobs and Internships'},
                communityServices: {items:['position', 'company', 'description'], title:'Community Service'},
                awards: {items:['name', 'organization', 'description'], title:'Awards'},
                activities: {items:['name', 'description'], title:'Activities'}
            }
            let tempSectionsLeft = []
            let valueCounter = 1
            Object.keys(profileSectionsSchema).map(key => {
                if (!profileUser.profile?.[key]) {
                    tempSectionsLeft.push({label: profileSectionsSchema?.[key].title, value: valueCounter})
                    valueCounter++
                }
            })
            setProfileSectionsLeft(tempSectionsLeft)
        }, [profileUser.profile])
    )
    useEffect(() => {
        console.log(profileSectionsLeft)
    }, [profileSectionsLeft]);
    const onSelectItem = (item) => {
        setProfileSectionType(item.value)
    }
    return (
        <Modal animationType={'fade'} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <CustomButton onPress={() => setAddSection(false)} text={'cancel'} />
                    <Text>Choose which section to add</Text>
                    <CustomDropdown placeholder='Choose Section' data={profileSectionsLeft} value={profileSectionType} onChange={onSelectItem} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '90%',
        height: '90%',
        padding: 20,
        backgroundColor: designChoices.offWhite,
        borderRadius: 3
    }
})