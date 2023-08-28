import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  draft: string[]
} = {
  draft: [],
}

export const holeSlice = createSlice({
  name: 'hole',
  initialState,
  reducers: {
    addHoleDraft(state, action) {
      state.draft.push(action.payload)
    },
  },
})

export const { addHoleDraft } = holeSlice.actions

export const HoleReducer = holeSlice.reducer
