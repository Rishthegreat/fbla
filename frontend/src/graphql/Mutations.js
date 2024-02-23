import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
        createUser(
            userData: {
                email: $email
                password: $password
                firstName: $firstName
                lastName: $lastName
            }
        ) {
            success
            message
        }
    }
`

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            user {
                firstName
                lastName
                email
                _id
            }
            accessToken
        }
    }
`

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($_id: String!, $section: String!, $changes: JSONString!, $subsectionId: String) {
        updateProfile(_id: $_id, section: $section, changes: $changes, subsectionId: $subsectionId) {
            success
            message
        }
    }
`

export const DELETE_SECTION = gql`
    mutation DeleteSection($_id: String!, $section: String!, $subsectionId: String!) {
        deleteSection(_id: $_id, section: $section, subsectionId: $subsectionId) {
            success
            message
        }
    }
`
export const UPDATE_MULTIPLE_PROFILE = gql`
    mutation UpdateMultipleProfile($_id: String!, $section: String!, $changes: JSONString!) {
        updateMultipleProfile(_id: $_id, section: $section, changes: $changes) {
            success
            message
        }
    }
`
