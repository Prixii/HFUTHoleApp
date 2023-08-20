import { request } from '@/request/spaceRequest'
import { HelpType } from '@/pages/space/@utils/types'

export function getHelp(type: HelpType) {
  return request<IHelpResponse>({
    url: `/api/help/${type}`,
  })
}

export function getSemesters() {
  return request<ISemestersResponse>({
    url: '/api/semesters',
  })
}
