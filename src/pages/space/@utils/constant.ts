export const DAY_HOURS = [
  { start: '08:00', index: 1 },
  { start: '10:00', index: 2 },
  { start: '12:00', index: null },
  { start: '14:00', index: 3 },
  { start: '16:00', index: 4 },
  { start: '18:00', index: null },
  { start: '19:00', index: 5 },
  { start: '22:00', index: 7 },
]

export enum CARD_COLORS {
  red = '248, 140, 142',
  blue = '99, 177, 239',
  green = '62, 183, 112',
  yellow = '248, 160, 67',
  purple = '185, 103, 227',
  'light-yellow' = '253, 152, 0',
  'light-blue' = '0, 165, 241',
  pink = '241, 103, 186',
  grown = '203, 167, 19',
  'light-green' = '60, 179, 201',
}

export const LESSON_INDEX_TO_TIME = [
  {
    startTime: '08:00',
    endTime: '08:50',
  },
  {
    startTime: '09:00',
    endTime: '09:50',
  },
  {
    startTime: '10:10',
    endTime: '11:00',
  },
  {
    startTime: '11:10',
    endTime: '12:00',
  },
  {
    startTime: '14:00',
    endTime: '14:50',
  },
  {
    startTime: '15:00',
    endTime: '15:50',
  },
  {
    startTime: '16:00',
    endTime: '16:50',
  },
  {
    startTime: '17:00',
    endTime: '17:50',
  },
  {
    startTime: '18:00',
    endTime: '18:50',
  },
  {
    startTime: '19:00',
    endTime: '19:50',
  },
  {
    startTime: '20:00',
    endTime: '20:50',
  },
]

export const WEEK_SCHEDULE_CARD_HEIGHT = 60

export const CARD_COLORS_KEYS = Object.keys(
  CARD_COLORS
) as unknown as keyof typeof CARD_COLORS
