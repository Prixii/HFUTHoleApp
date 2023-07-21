import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resetStoreState } from '@/shared/utils/store'
import { JSONDeepClone } from '@/shared/utils/utils'

interface SpaceUserState {
  isLogin: boolean
  meta: {
    token: string
  }
  info: IUserInfoResponse
}

const initialState: SpaceUserState = {
  isLogin: false,
  meta: {
    token: '',
  },
  info: {
    adminClass: '',
    campus: '',
    department: '',
    grade: '',
    major: '',
    name: '',
    studentId: 0,
    studyYears: '',
  },
}

export const spaceUserSlice = createSlice({
  name: 'spaceUser',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLogin = true
      state.meta = {
        token: action.payload,
      }
    },
    logout(state) {
      resetStoreState(state, JSONDeepClone(initialState))
    },
    setUserInfo(state, action: PayloadAction<IUserInfoResponse>) {
      state.info = action.payload
    },
  },
})

export const { login, logout, setUserInfo } = spaceUserSlice.actions

export const SpaceUserReducer = spaceUserSlice.reducer
