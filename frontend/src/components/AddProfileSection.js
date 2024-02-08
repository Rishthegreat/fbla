/* eslint-disable */

import {View, Text, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, Keyboard} from "react-native";
import React, {useCallback, useContext, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {CustomDropdown, CustomInput, CustomButton} from "../components";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import {useMutation} from "@apollo/client";
import {UPDATE_PROFILE} from "../graphql";
import {AuthContext} from "../contexes/auth-context";

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
            let prompt = value.toLocaleString()
            return (
                <View>
                    <Text>{prompt[0].toLocaleUpperCase()+prompt.slice(1, prompt.length)}</Text>
                    <CustomInput expandable={true} placeholder={value} setValue={(updatedText) => {
                        setQuestionAnswers(p => {
                            return {...p, [value]: updatedText}
                        })
                    }} />
                </View>
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
                    <Text style={{...styles.questionText, color: designChoices.error}}>If the section chosen has no information, it will be added to your profile</Text>
                    <Text style={styles.questionText}>Choose which section to add information to</Text>
                    <CustomDropdown placeholder='Select Item...' data={profileSectionsLeft} value={profileSectionType?.value} onChange={onSelectItem} />
                    <View style={{marginVertical: 15}}>{additionalQuestions}</View>{/* Dynamically updating inputs */}
                    {additionalQuestions &&
                        <CustomButton text={'Add'} onPress={submitAddSection} />
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
        alignItems: 'center',
        position: "relative",
    },
    container: {
        padding: 25,
        backgroundColor: 'rgb(239,239,239)',
        borderRadius: 3,
        overflowY: "scroll",
        minHeight: '90%',
        width: '90%'
    },
    closeContainer: {
        width: 20,
        position: "absolute",
        top: 10,
        right: 10
    },
    questionText: {
        fontSize: 17,
        marginVertical: 4
    }
})