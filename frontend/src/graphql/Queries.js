import { gql } from "@apollo/client";

export const WHOLE_USER_BY_ID = gql`
    query WholeUserById($_id: String!) {
        user(_id: $_id) {
            firstName
            lastName
            email
            profile {
                school
                colleges
            }
        }
    }
`