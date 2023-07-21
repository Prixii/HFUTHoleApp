import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { calculateWeekAndDay } from '@/pages/space/@utils/utils'
import { resetStoreState } from '@/shared/utils/store'
import { JSONDeepClone } from '@/shared/utils/utils'

export type VisibleSchedule = {
  weekIdx: number
  dayIdx: number
}

export type SpaceCourseState = {
  courseInfo: ICourseResponse
  daySchedule: VisibleSchedule
  weekSchedule: VisibleSchedule
}

const initialState: SpaceCourseState = {
  courseInfo: {
    lessons: [],
    mainInfo: {
      weekCount: 20,
      curWeek: 1,
      curDayIndex: 1,
      semesterStartDate: '',
    },
    mooc: [],
    schedule: Array.from({ length: 20 }, () =>
      Array.from({ length: 7 }, () => [])
    ),
    exams: [],
  },
  daySchedule: {
    weekIdx: 0,
    dayIdx: 0,
  },
  weekSchedule: {
    weekIdx: 0,
    dayIdx: 0,
  },
}

export const spaceCourseSlice = createSlice({
  name: 'spaceCourse',
  initialState,
  reducers: {
    changeCourseInfo(state, action: PayloadAction<ICourseResponse>) {
      state.courseInfo = action.payload
    },
    changeSchedule(
      state,
      action: PayloadAction<Partial<{ week: number; day: number }>>
    ) {
      const payload = action.payload
      const { day, week } = calculateWeekAndDay(
        state.courseInfo.mainInfo.semesterStartDate
      )
      const scheduleIdx = {
        weekIdx: payload?.week || week,
        dayIdx: payload?.day || day,
      }
      state.daySchedule = scheduleIdx
      state.weekSchedule = scheduleIdx
    },
    resetStore(state) {
      resetStoreState(state, JSONDeepClone(initialState))
    },
    setDaySchedule(state, action: PayloadAction<VisibleSchedule>) {
      state.daySchedule = action.payload
    },
    setWeekSchedule(state, action: PayloadAction<VisibleSchedule>) {
      state.weekSchedule = action.payload
    },
  },
})

export const {
  changeCourseInfo,
  changeSchedule,
  resetStore,
  setDaySchedule,
  setWeekSchedule,
} = spaceCourseSlice.actions

export const SpaceCourseReducer = spaceCourseSlice.reducer
