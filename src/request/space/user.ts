import { request } from '@/request/spaceRequest'

export interface ICustomScheduleDto {
  id?: string
  semesterId?: number
  name: string
  mark: string
  color: string
  schedule: Partial<CustomSchedule>
}

interface CustomSchedule {
  room: string
  weekDay: number
  startTime: string
  endTime: string
  weeks: number[]
}

export function getUserInfoRequest() {
  return request<IUserInfoResponse>({
    url: 'user/info',
  })
}

export function getUserCardBaseRequest() {
  return request<ICardBaseInfoResponse>({
    url: 'user/card/base',
  })
}

export function addScheduleRequest(data: ICustomScheduleDto) {
  return request<null>({
    url: 'course/diy/add',
    method: 'POST',
    data,
    params: {
      semesterId: data.semesterId,
    },
  })
}

export function updateScheduleRequest(data: ICustomScheduleDto) {
  return request<null>({
    url: 'course/diy/update',
    method: 'POST',
    data,
    params: {
      semesterId: data.semesterId,
    },
  })
}

export function deleteScheduleRequest(diyId: string, semesterId?: number) {
  return request<null>({
    url: 'course/diy/delete',
    params: {
      diyId,
      semesterId,
    },
  })
}
