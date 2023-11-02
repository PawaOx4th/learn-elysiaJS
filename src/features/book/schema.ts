import { gql } from '@elysiajs/apollo'

export const typeDefs = gql`
    type Book {
        title: String
        author: String
        age: Int
    }

    type Profile {
        firstName: String
        age: Int
        lastName: String
        address: String
    }

    type Author {
        name: String
        books: [Book]
        profile: Profile
    }

    type Query {
        books: [Book]
        authors: [Author]
    }
`

export const a = /* GraphQL */ `
    type User {
        name: String
    }
`
