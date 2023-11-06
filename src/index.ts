import apollo, { gql } from '@elysiajs/apollo'
import { Elysia } from 'elysia'
import { readFileSync, writeFileSync } from 'fs'
import { Resolvers } from './__generated__/resolvers-types'
import axios from 'axios'
import serverTiming from '@elysiajs/server-timing'
import { Mobius } from 'graphql-mobius'

const typeDefsSchema = readFileSync(
    import.meta.dir.concat('/features/book/schema.graphql'),
    {
        encoding: 'utf-8',
    }
)

const resolvers: Resolvers = {
    Query: {
        users: async (_, { id }) => {
            const start = performance.now()
            const response = await axios
                .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then((res) => res.data)

            // console.log(response)
            console.log(`[LOG] 🟢 ${performance.now() - start} ms.`)
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
    .get('/schema', () => {
        const typeDefsSchemaFile = readFileSync(
            import.meta.dir.concat('/features/book/schema.graphql'),
            {
                encoding: 'utf-8',
            }
        )
        return typeDefsSchemaFile
    })
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
