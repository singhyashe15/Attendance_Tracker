import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  subject:[]
}

export const subSlice = createSlice({
  name: 'sub',
  initialState,
  reducers: {
    addsub : (state, action) => {
      console.log(action.payload)
      state.subject.push(action.payload);
      console.log(state.subject)
    },
  }
})

export const { addsub } = subSlice.actions

export default subSlice.reducer