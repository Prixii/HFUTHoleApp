import { getRandomQAQ, type IQAQ } from 'qaq-font'
import { AuthStore } from '@/store/auth'
import { formatDistanceToNow, differenceInDays, format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const getQAQFont = (key: keyof IQAQ) => getRandomQAQ(key)[0]

export const packStorageToken = () => `Bearer ${AuthStore.meta.token}`

export function formatDate(time: string) {
  const date = new Date(time)
  const now = new Date()
  const diffInDays = differenceInDays(now, date)

  if (diffInDays < 1) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: zhCN,
    })
      .toString()
      .replace('大约 ', '')
  } else if (diffInDays < 3) {
    return `${diffInDays}天前`
  } else if (diffInDays < 365) {
    return format(date, 'MM/dd', { locale: zhCN }).toString()
  } else {
    return format(date, 'YYYY/MM/DD', { locale: zhCN }).toString()
  }
}
