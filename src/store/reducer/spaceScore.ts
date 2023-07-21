import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resetStoreState } from '@/shared/utils/store'
import { JSONDeepClone } from '@/shared/utils/utils'

const rank = {
  rank: 0,
  mine: 0,
  max: 0,
  avg: 0,
  head: 0,
  actualNum: 0,
}

const initialState: IScoreResponse = {
  calculateLogs: [],
  semesters: [],
  compulsoryRank: {
    score: rank,
    gpa: rank,
    total: 0,
  },
  totalRank: {
    score: rank,
    gpa: rank,
    total: 0,
  },
}

const spaceScoreSlice = createSlice({
  name: 'spaceScore',
  initialState: initialState,
  reducers: {
    changeScore(state, action: PayloadAction<IScoreResponse>) {
      resetStoreState(state, action.payload)
    },
    resetStore(state) {
      resetStoreState(state, JSONDeepClone(initialState))
    },
  },
})

export const { changeScore, resetStore } = spaceScoreSlice.actions

export const SpaceScoreReducer = spaceScoreSlice.reducer
