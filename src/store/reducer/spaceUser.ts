import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const spaceUserSlice = createSlice({
  name: 'spaceUser',
  initialState: {
    isLogin: false,
    meta: {
      token: '',
    },
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
      state.meta = {
        token: '',
      }
    },
  },
})

export const { login, logout } = spaceUserSlice.actions

export const SpaceUserReducer = spaceUserSlice.reducer
