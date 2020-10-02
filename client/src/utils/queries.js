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
      cards {
        _id
        companyName
      }
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
      createdCards {
        _id
        companyName
      }
    }
  }
`;


export const QUERY_CARDS = gql`
  query cards ($username: String) {
    cards (username: $username) {
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


export const QUERY_CARD = gql`
  query cards ($username: String!) {
    cards (username: $username) {
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

