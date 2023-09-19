import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeStoreState } from '@/shared/utils/store'
import { JSONDeepClone } from '@/shared/utils/utils'
import { getUserCardBaseRequest } from '@/request/space/user'
import { WritableDraft } from 'immer/dist/types/types-external'

interface SpaceUserState {
  isLogin: boolean
  meta: {
    token: string
  }
  info: IUserInfoResponse
  card: ICardBaseInfoResponse['data'] | null
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
  card: null,
}

const setCardInfo = async (state: WritableDraft<SpaceUserState>) => {
  const { data } = await getUserCardBaseRequest()
  state.card = data
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
      // setCardInfo(state)
    },
    logout(state) {
      changeStoreState(state, JSONDeepClone(initialState))
    },
    setUserInfo(state, action: PayloadAction<IUserInfoResponse>) {
      state.info = action.payload
    },

    setUserCard(state, action: PayloadAction<ICardBaseInfo>) {
      state.card = action.payload
    },
  },
})

export const { login, logout, setUserInfo, setUserCard } =
  spaceUserSlice.actions

export const SpaceUserReducer = spaceUserSlice.reducer
