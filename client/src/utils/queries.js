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
  query card($id: ID!) {
    card(_id: $id) {
      _id
      name
      jobTitle
      phone
      email
    }
  }
`;