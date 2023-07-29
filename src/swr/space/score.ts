import { SWRKeys } from '@/swr/utils'
import { useQuery } from 'react-query'
import {
  getScoreRequest,
  getSingleScoreRequest,
  getSingleScoreSchoolRequest,
} from '@/request/spaceApis/score'
import { useAppDispatch } from '@/store/store'
import { changeScore } from '@/store/reducer/spaceScore'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useEffect } from 'react'

const scoreAllKey = [SWRKeys.space.score.all]

export const useSpaceScore = () => {
  const dispatch = useAppDispatch()
  const { isLogin } = useAuth()

  const query = useQuery<IScoreResponse>(scoreAllKey, {
    retry: false,
    enabled: isLogin,
    queryFn: () => getScoreRequest(),
    onSuccess(data) {
      dispatch(changeScore(data))
    },
  })

  useEffect(() => {
    isLogin && query.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return query
}

export const useSpaceSingleScore = (params: SingleScoreDto) => {
  const key = [SWRKeys.space.score.single, params]

  return useQuery(key, async () => {
    const res = await Promise.all([
      getSingleScoreRequest(params),
      getSingleScoreSchoolRequest(params),
    ])

    return {
      ...res[0],
      schoolRank: res[1],
    }
  })
}
