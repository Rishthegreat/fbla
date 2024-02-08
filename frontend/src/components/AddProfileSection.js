/* eslint-disable */

import {View, Text, TouchableOpacity, Modal, StyleSheet, Pressable} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {CustomButton} from "./CustomButton";
import {useFocusEffect} from "@react-navigation/native";
import {CustomDropdown} from "./CustomDropdown";
import {CustomInput} from "./CustomInput";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import {useMutation} from "@apollo/client";
import {UPDATE_PROFILE} from "../graphql";
import {AuthContext} from "../contexes/auth-context";


const FurtherQuestions = () => {
    const [value, setValue] = useState('')
    return (
        <View>
            <Text></Text>
            <CustomInput value={value} setValue={setValue} />
        </View>
    )
}

export const AddProfileSection = ({profileUser, setAddSection}) => {
    const [profileSectionsLeft, setProfileSectionsLeft] = useState([])
    const [profileSectionType, setProfileSectionType] = useState(null)
    const [additionalQuestions, setAdditionalQuestions] = useState(null)
    const [questionAnswers, setQuestionAnswers] = useState({})
    const [updateProfileMutation] = useMutation(UPDATE_PROFILE)
    const {_id} = useContext(AuthContext)
    const profileSectionsSchema = { // remember to change this if backend is changed
        school: {items:['name'], label:'Current School'},
        colleges: {items:['name'], label:'Colleges'},
        classes: {items:['name'], label:'Classes'},
        tests: {items:['name', 'score'], label:'Tests'},
        clubs: {items:['name', 'position', 'description'], label:'Clubs'},
        jobsInternships: {items:['position', 'company', 'description'], label:'Jobs and Internships'},
        communityServices: {items:['position', 'company', 'description'], label:'Community Service'},
        awards: {items:['name', 'organization', 'description'], label:'Awards'},
        activities: {items:['name', 'description'], label:'Activities'}
    }
    useFocusEffect(
        useCallback(() => {
            let tempSectionsLeft = []
            let valueCounter = 1
            Object.keys(profileSectionsSchema).map(key => {
                tempSectionsLeft.push({label: profileSectionsSchema?.[key].label, value: valueCounter, key:key})
                valueCounter++
            })
            setProfileSectionsLeft(tempSectionsLeft)
        }, [profileUser.profile])
    )
    const onSelectItem = (item) => {
        console.log(item)
        setProfileSectionType(item)
        let questions = profileSectionsSchema?.[item.key].items.map(value => { //Need to add functionality to make the textboxes expand as text gets longer
            return (
                <CustomInput placeholder={value} setValue={(updatedText) => {
                    setQuestionAnswers(p => {
                        return {...p, [value]: updatedText}
                    })
                }} />
            )
        })
        setAdditionalQuestions(questions)
    }
    const submitAddSection = () => {
        console.log(JSON.stringify(questionAnswers))
        updateProfileMutation({variables: {_id: _id, section:profileSectionType.key, changes: JSON.stringify(questionAnswers), subsectionId: 'null'}, onError: (e) => console.log(JSON.stringify(e, null, 2))})
        // Need to change the query a bit
    }
    return (
        <Modal animationType={'fade'} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeContainer} onPress={() => setAddSection(false)}>
                        <Icon name={'close'} size={20} color={designChoices.almostBlack} />
                    </TouchableOpacity>
                    <Text style={styles.questionText}>Choose which section to add</Text>
                    <CustomDropdown placeholder='Select Item...' data={profileSectionsLeft} value={profileSectionType?.value} onChange={onSelectItem} />
                    <View>{additionalQuestions}</View>{/* Dynamically updating inputs */}
                    {additionalQuestions &&
                        <CustomButton text={'Add Section'} onPress={submitAddSection} />
                    }
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
        padding: 25,
        backgroundColor: 'rgb(239,239,239)',
        borderRadius: 3
    },
    closeContainer: {
        width: 20,
        position: "absolute",
        top: 10,
        right: 10
    },
    questionText: {
        fontSize: 17
    }
})