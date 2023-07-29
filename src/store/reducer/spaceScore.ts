import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeStoreState } from '@/shared/utils/store'
import { JSONDeepClone } from '@/shared/utils/utils'

export type ScoreType = 'score' | 'gpa'
export type RankType = 'compulsoryRank' | 'totalRank'

const rank = {
  rank: 0,
  mine: 0,
  max: 0,
  avg: 0,
  head: 0,
  actualNum: 0,
}

const initialState: IScoreResponse & {
  scoreType: ScoreType
  rankType: RankType
} = {
  calculateLogs: [],
  semesters: [],
  scoreType: 'score',
  rankType: 'compulsoryRank',
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
      changeStoreState(state, action.payload)
    },
    resetStore(state) {
      changeStoreState(state, JSONDeepClone(initialState))
    },
    setScoreType(state, action: PayloadAction<ScoreType>) {
      state.scoreType = action.payload
    },
    setRankType(state, action: PayloadAction<RankType>) {
      state.rankType = action.payload
    },
  },
})

export const { changeScore, resetStore, setRankType, setScoreType } =
  spaceScoreSlice.actions

export const SpaceScoreReducer = spaceScoreSlice.reducer
