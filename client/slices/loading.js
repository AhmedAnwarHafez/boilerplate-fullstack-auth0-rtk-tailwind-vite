import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {
    setWaiting: () => true,
    clearWaiting: () => false,
  },
})

export const { setWaiting, clearWaiting } = slice.actions
export default slice.reducer
