import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reduxSlices/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice
  },
})