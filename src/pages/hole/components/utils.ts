import { Limit } from '@/shared/config'

export function sliceHoleInfoCommentBody(body: string) {
  const maxLength = Limit.hole.maxInfoCommentBodyLength

  return `${body.trim().slice(0, maxLength)}${
    body.trim().length > maxLength ? '......' : ''
  }`
}
