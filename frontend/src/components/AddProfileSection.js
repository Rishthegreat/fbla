/* eslint-disable */

import {View, Text, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, Keyboard} from "react-native";
import React, {useCallback, useContext, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {CustomDropdown, CustomInput, CustomButton, PopupModal} from "../components";
import {designChoices, profileSectionsSchema} from "../../GlobalConsts";
import {useMutation} from "@apollo/client";
import {UPDATE_PROFILE} from "../graphql";
import {AuthContext} from "../contexes/auth-context";
import {AlertContext} from "../contexes/AlertContext";

export const AddProfileSection = ({profileUser, setAddSection, refetch}) => {
    const [profileSectionsLeft, setProfileSectionsLeft] = useState([])
    const [profileSectionType, setProfileSectionType] = useState(null)
    const [additionalQuestions, setAdditionalQuestions] = useState(null)
    const [questionAnswers, setQuestionAnswers] = useState({})
    const [updateProfileMutation] = useMutation(UPDATE_PROFILE)
    const {setAlert} = useContext(AlertContext)
    const {_id} = useContext(AuthContext)
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
            .then((r) => {
                refetch()
                setAddSection(false)
                console.log(r)
                setAlert('Added Successfully!', 'success')
            })
    }
    return (
        <PopupModal onClose={() => setAddSection(false)}>
            <Text style={{...styles.questionText, color: designChoices.error}}>If the section chosen has no information, it will be added to your profile</Text>
            <Text style={styles.questionText}>Choose which section to add information to</Text>
            <CustomDropdown placeholder='Select Item...' data={profileSectionsLeft} value={profileSectionType?.value} onChange={onSelectItem} />
            <View style={{marginVertical: 15}}>{additionalQuestions}</View>{/* Dynamically updating inputs */}
            {additionalQuestions &&
                <CustomButton text={'Add'} onPress={submitAddSection} />
            }
        </PopupModal>
    )
}

const styles = StyleSheet.create({
    questionText: {
        fontSize: 17,
        marginVertical: 4
    }
})