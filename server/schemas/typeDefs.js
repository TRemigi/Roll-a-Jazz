// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

     type Card{
        _id: ID!
        logoUrl: String
        companyName: String
        tagline: String
        name: String!
        jobTitle: String!
        website: String
        phone: String!
        email: String!
    }

    input CardInput {
        logoUrl: String
        companyName: String
        tagline: String
        name: String
        jobTitle: String
        website: String
        phone: String
        email: String
    }

    type Query {
        helloWorld: String
        me: User
        users: [User]
        user(username: String!): User
        cards(username: String): [Card]
        card(_id: ID): Card
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addCard(logoUrl: String, companyName: String, tagline: String, name: String!, jobTitle: String!, website: String, phone: String!, email: String!): Card
        updateCard(_id: ID!, update: CardInput): Card
        deleteCard(_id: ID!): Card
    }
`;

//export the typeDefs
module.exports = typeDefs;
