import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AwaitAble } from '@/shared/types'
import produce from 'immer'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    data: [],
  },
  reducers: {
    operateSearchData(
      state,
      action: PayloadAction<(draft: string[]) => AwaitAble<string[] | void>>
    ) {
      state.data = produce(state.data, action.payload)
    },
  },
})

export const { operateSearchData } = searchSlice.actions

export const SearchReducer = searchSlice.reducer
