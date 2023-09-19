import { SWRKeys } from '@/swr/utils'
import { useQuery } from 'react-query'
import {
  getScoreRequest,
  getSingleScoreRequest,
  getSingleScoreSchoolRequest,
} from '@/request/space/score'
import { useAppDispatch } from '@/store/store'
import { changeScore } from '@/store/reducer/spaceScore'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useEffect } from 'react'
import { useParams } from '@/shared/hooks/useParams'
import { useBaseQuery } from '@/swr/useBaseQuery'

const scoreAllKey = [SWRKeys.space.score.all]

export const useSpaceScore = () => {
  const dispatch = useAppDispatch()
  const { isLogin } = useSpaceAuth()

  const query = useQuery<IScoreResponse>(scoreAllKey, {
    enabled: isLogin,
    queryFn: () => {
      return getScoreRequest()
    },
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

export const useSpaceSingleScore = () => {
  const params = useParams<SingleScoreDto>()
  const key = [SWRKeys.space.score.single, params.lessonId, params.semesterId]

  const query = useBaseQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await Promise.all([
        getSingleScoreRequest(params),
        getSingleScoreSchoolRequest(params),
      ])

      return {
        ...res[0],
        schoolRank: res[1],
      }
    },
  })

  return {
    ...query,
  }
}
