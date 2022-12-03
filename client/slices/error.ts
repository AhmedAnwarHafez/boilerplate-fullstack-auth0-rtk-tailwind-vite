import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'error',
  initialState: '',
  reducers: {
    setError: (_, { payload }) => payload,
    clearError: () => '',
  },
})

export const { setError, clearError } = slice.actions
export default slice.reducer
