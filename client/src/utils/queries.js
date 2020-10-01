import gql from 'graphql-tag';

export const EXAMPLE = gql`
    query {
        example
    }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_CARDS = gql`
  query cards($username: String) {
    card(username: $username) {
      _id
      logoUrl
      companyName
      tagline
      name
      jobTitle
      website
      phone
      email
    }
  }
`;