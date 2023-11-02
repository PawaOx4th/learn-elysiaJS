import apollo, { gql } from "@elysiajs/apollo"
import { Elysia } from "elysia"
import { typeDefs } from "./features/book/schema"
import { readFileSync } from "fs"

const getDataBook = () => ({
  title: "Elysia",
  author: "Kaen",
})

const typeDefsSchema = readFileSync(
  import.meta.dir.concat("/features/book/schema.graphql"),
  {
    encoding: "utf-8",
  }
)
const app = new Elysia()
  .use(
    apollo({
      typeDefs: typeDefsSchema,
      resolvers: {
        Query: {
          books: (_, args) => {
            console.log("[LOG] 🦁  args :", args)
            return [
              {
                title: "Elysia",
                author: "Kaen",
              },
            ]
          },
          authors: () => {
            const responseBook = getDataBook()
            return [
              {
                name: "Kaen",
                books: [responseBook],
              },
            ]
          },
        },
      },
    })
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
