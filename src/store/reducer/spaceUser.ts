import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resetStoreState } from '@/shared/utils/store'

interface SpaceUserState {
  isLogin: boolean
  meta: {
    token: string
  }
  info: IUserInfo
}

// TODO 冻结对象好像也不对😅
const initialState: SpaceUserState = Object.freeze({
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
})

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
      resetStoreState(state, initialState)
    },
    setUserInfo(state, action: PayloadAction<IUserInfo>) {
      state.info = action.payload
    },
  },
})

export const { login, logout, setUserInfo } = spaceUserSlice.actions

export const SpaceUserReducer = spaceUserSlice.reducer
