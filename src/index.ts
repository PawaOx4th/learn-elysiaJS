import apollo, { gql } from "@elysiajs/apollo"
import { Elysia } from "elysia"
import { typeDefs } from "./features/book/schema"
import { readFileSync } from "fs"
import { Resolvers } from "./__generated__/resolvers-types"
import axios from "axios"

const typeDefsSchema = readFileSync(
  import.meta.dir.concat("/features/book/schema.graphql"),
  {
    encoding: "utf-8",
  }
)

const resolvers: Resolvers = {
  Query: {
    books: async (_, args) => {
      // {
      //   "userId": 1,
      //   "id": 1,
      //   "title": "delectus aut autem",
      //   "completed": false
      //   }
      const { title } = await axios
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .then((res) => res.data)

      return [
        {
          title,
          author: "Kaen",
          age: 20,
        },
      ]
    },
    users: async (_, { id }) => {
      const response = await axios
        .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => res.data)

      console.log(response)
      return [response]
    },
  },
}
const app = new Elysia()
  .use(
    apollo({
      typeDefs: typeDefsSchema,
      resolvers: resolvers,
    })
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
