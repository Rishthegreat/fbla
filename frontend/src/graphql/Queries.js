import { gql } from "@apollo/client";

export const PROFILE_BY_ID = gql`
    query ProfileById($_id: String!) {
        user(_id: $_id) {
            profile {
                school
                colleges
            }
        }
    }
`
