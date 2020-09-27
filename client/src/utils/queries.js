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