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