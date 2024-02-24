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
                _id
            }
            classes {
                name
                _id
            }
            tests {
                name
                score
                _id
            }
            clubs {
                name
                position
                description
                _id
            }
            jobsInternships {
                position
                company
                description
                _id
            }
            communityServices {
                position
                organization
                hours
                description
                _id
            }
            awards {
                name
                organization
                description
                _id
            }
            activities {
                name
                description
                activityId
            }
        }
        }
    }
`

export const GET_POSTS = gql`
    query GetPosts($_id: String!, $page: Int) {
        posts(_id: $_id, page: $page) {
            _id
            owner
            title
            likes
            content
            image
            timestamp
        }
    }
`