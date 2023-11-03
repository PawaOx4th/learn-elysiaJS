import apollo, { gql } from '@elysiajs/apollo'
import { Elysia } from 'elysia'
import { readFileSync } from 'fs'
import { Resolvers } from './__generated__/resolvers-types'
import axios from 'axios'
import serverTiming from '@elysiajs/server-timing'

const typeDefsSchema = readFileSync(
    import.meta.dir.concat('/features/book/schema.graphql'),
    {
        encoding: 'utf-8',
    }
)

const resolvers: Resolvers = {
    Query: {
        // books: async (_, args) => {
        //     const { title } = await axios
        //         .get('https://jsonplaceholder.typicode.com/todos/1')
        //         .then((res) => res.data)

        //     return [
        //         {
        //             title,
        //             author: 'Kaen',
        //             age: 20,
        //         },
        //     ]
        // },
        users: async (_, { id }) => {
            const start = performance.now()
            const response = await axios
                .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then((res) => res.data)

            // const response = await fetch(
            //     `https://jsonplaceholder.typicode.com/todos/${id}`
            // ).then((res) => res.json())

            // console.log(response)
            console.log(`[LOG] 🟢 ${performance.now() - start} ms.`)
            return [response]
        },
    },
}
const app = new Elysia()
    .trace(async ({ beforeHandle, request, response, set }) => {
        const { children, time: start, end } = await beforeHandle
        for (const child of children) {
            const { time: start, end, name } = await child

            console.log(name, 'took', (await end) - start, 'ms')
        }

        console.log('beforeHandle took', (await end) - start)

        const re = await request
        console.log('[LOG] 🚀  request :', await re)

        set.headers
    })

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
