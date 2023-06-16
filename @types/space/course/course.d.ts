declare interface ICourse {
  mainInfo: IMainInfo
  lessons: ILesson[]
  mooc: IMooc[]
  schedule: ISchedule[][][]
  exams: IExam[]
}

interface IMooc {
  id: number
  name: string
  detail: ILessonDetail
  mock: boolean
}

interface IExam {
  name: string
  startTime: string
  endTime: string
  date: string
  position: string
  mark: string
}

interface ILessonDetail {
  adminClass: string
  studentCount: number
  credits: string
  courseType: string
  code: string
  weeks: string
  examMode: string
  teachers: string[]
}

interface IMainInfo {
  weekCount: number
  curWeek: number
  curDayIndex: number
  semesterStartDate: string
}

interface ILesson {
  id: number
  courseName: string
  detailInfo: DetailInfo
  type: 'Lesson' | 'Exam' | 'Diy'
  diyId: string
}

interface DetailInfo {
  adminClass: string
  studentCount: number
  credits: string
  courseTypeName: string
  code: string
  color: string
  mark: string
  weeks: string
  examMode: string
  teachers: string[]
}

interface ISchedule {
  startTime: string
  endTime: string
  index: number
  period: number
  wholePoint: boolean
  room: string
  lessonStartIndex: number
  lessonIndex: number
}
