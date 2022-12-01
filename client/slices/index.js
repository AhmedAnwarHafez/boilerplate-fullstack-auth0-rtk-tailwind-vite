import { configureStore } from '@reduxjs/toolkit'
import loading from './loading'

const store = configureStore({
  reducer: {
    loading,
  },
})

export default store
