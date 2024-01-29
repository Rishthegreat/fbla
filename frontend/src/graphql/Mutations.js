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
            user {
                firstName
                Id
                email
                lastName
            }
        }
    }
`