import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducers/counter";
import todoApi from "./reducers/todos";


const store = configureStore({
  reducer: {
    counter1: counterSlice,
    [todoApi.reducerPath]: todoApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store