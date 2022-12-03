import { configureStore } from '@reduxjs/toolkit'
import loading from './loading'
import error from './error'

const store = configureStore({
  reducer: {
    loading,
    error,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
