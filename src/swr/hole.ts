import { useInfiniteQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { GetHoleListRequest } from '@/request/apis/hole'
import { AxiosError } from 'axios'

export function useHoleList() {
  const requestList = () => GetHoleListRequest()

  return useInfiniteQuery(SWRKeys.hole.list, requestList, {
    retry: false,
  })
}
