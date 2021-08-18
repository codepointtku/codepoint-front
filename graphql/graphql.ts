import {gql} from '@apollo/client'

// list of graphql queries
export const GET_PROFILES = gql`
  query Profiles {
    profiles {
      id
      name
      bio
      url
      linkedin
      github
      avatarUrl
    }
  }
`

export const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      url
      name
      description
      homePageUrl
    }
  }
`
