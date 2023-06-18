import { createTransform, TransformOutbound } from 'redux-persist'
import { SpaceCourseState } from '@/store/reducer/spaceCourse'
import { calculateWeekAndDay } from '@/shared/utils/spaceCourse'

// createTransform 在处理分离Reducer时有问题
export const spaceCourseTransform = createTransform<
  SpaceCourseState,
  SpaceCourseState,
  any,
  SpaceCourseState
>(
  (fieldValue) => fieldValue,
  (fieldValue, key, state) => {
    // if (key === 'currentWeekIdx') {
    // const semesterStartDate = state.courseInfo.mainInfo.semesterStartDate
    // if (!semesterStartDate) {
    //   return fieldValue
    // }
    // const { day, week } = calculateWeekAndDay(semesterStartDate)
    // const scheduleIdx = {
    //   weekIdx: week,
    //   dayIdx: day,
    // }
    // }
    return fieldValue
  }
)
