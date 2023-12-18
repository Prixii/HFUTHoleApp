import { Page } from '@/shared/enums'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  isLogin: boolean
  meta: {
    token: string
  } | null
  helloPage: Page
} = {
  isLogin: false,
  meta: null,
  helloPage: Page.hole,
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
    setHelloPage: (state, action: PayloadAction<Page>) => {
      state.helloPage = action.payload
    },
  },
})

export const { login, logout, setHelloPage } = userSlice.actions

export const UserReducer = userSlice.reducer
