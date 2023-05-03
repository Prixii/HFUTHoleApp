import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    meta: null,
  },
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true
      state.meta = {
        token: action.payload,
      }
    },
    logout: (state) => {
      state.isLogin = false
    },
  },
})

export const { login, logout } = userSlice.actions

export const UserReducer = userSlice.reducer
