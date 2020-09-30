import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CARD = gql`
mutation addCard($logoUrl: String, $companyName: String, $tagline: String, $name: String!, $jobTitle: String!, $website: String, $phone: String!, $email: String!) {
  addCard(logoUrl: $logoUrl, companyName: $companyName, tagline: $tagline, name: $name, jobTitle: $jobTitle, website: $website, phone: $phone, email: $email ) {
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
