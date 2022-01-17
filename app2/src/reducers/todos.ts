// https://jsonplaceholder.typicode.com/todos
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  endpoints: (builder) => ({
    getTodo: builder.query({ query: () => 'https://jsonplaceholder.typicode.com/todos' })
  })
})

export const { useGetTodoQuery } = todoApi

export default todoApi