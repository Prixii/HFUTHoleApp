import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  isLogin: boolean
  meta: {
    token: string
  } | null
} = {
  isLogin: false,
  meta: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
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
