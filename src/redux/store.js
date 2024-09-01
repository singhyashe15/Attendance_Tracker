import { configureStore } from '@reduxjs/toolkit'
import subReducer from './slice'


export const store = configureStore({
  reducer: {
    sub : subReducer
  },
})