import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {
    setLoading: () => true,
    clearLoading: () => false,
  },
})

export const { setLoading, clearLoading } = slice.actions
export default slice.reducer
