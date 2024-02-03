import { gql } from "@apollo/client";

export const WHOLE_USER_BY_ID = gql`
    query WholeUserById($_id: String!) {
        user(_id: $_id) {
            firstName
            lastName
            email
            profile {
                school {
                    name
                }
                colleges {
                    name
                }
                classes {
                    name
                }
                tests {
                    name
                    score
                }
                clubs {
                    name
                    position
                    description
                }
                jobsInternships {
                    position
                    company
                    description
                }
                communityServices {
                    position
                    organization
                    hours
                    description
                }
                awards {
                    name
                    organization
                    description
                }
                activities {
                    name
                    description
                }
            }
        }
    }
`