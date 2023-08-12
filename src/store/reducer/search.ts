import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AwaitAble } from '@/shared/types'
import produce from 'immer'

const initialState: {
  hole: string[]
  failure: string[]
} = {
  hole: [],
  failure: [],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    operateHoleSearchData(
      state,
      action: PayloadAction<(draft: string[]) => void>
    ) {
      state.hole = produce(state.hole, action.payload)
    },
    operateFailureSearchData(
      state,
      action: PayloadAction<(draft: string[]) => void>
    ) {
      state.failure = produce(state.failure, action.payload)
    },
  },
})

export const { operateHoleSearchData, operateFailureSearchData } =
  searchSlice.actions

export const SearchReducer = searchSlice.reducer
