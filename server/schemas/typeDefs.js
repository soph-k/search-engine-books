// import the gql tagged template function
const { gql } = require ('apollo-server-express');

// Model files define the following fields by their Schemas  
const typeDefs = gql`
  
type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    _id: ID!
    authors: [String]
    # authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!  
  } 

  type Auth {
    token: ID!
    user: User 
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    
    addUser(username: String!, email: String! password: String!): Auth

    saveBook(input: BookInput): User

    removeBook(bookId: String!): User
  }
  `;
  module.exports = typeDefs;