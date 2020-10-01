import gql from "graphql-tag";

export const EXAMPLE = gql`
  query {
    example
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      email
    }
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

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USERS = gql`
  query card($_id: ID!) {
    card(_id: $_id) {
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

export const QUERY_USERS = gql`
  query cards($userId: String) {
    cards(userId: $userId) {
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
