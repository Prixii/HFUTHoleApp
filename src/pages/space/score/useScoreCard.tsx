import { useAppDispatch, useAppSelector } from '@/store/store'
import { useMemo } from 'react'
import { formatScore } from '../@utils/utils'
import {
  AwardIcon,
  UserIcon,
  UserFriendsIcon,
  FireIcon,
} from '@/components/icon'
import { setScoreType, type ScoreType } from '@/store/reducer/spaceScore'
import type { ButtonOptions } from '@/components/button/ToggleButton'
import type { ScoreInfo } from '@/pages/space/@utils/types'

const buttonOptions: ButtonOptions<ScoreType>[] = [
  { key: 'score', title: '均分' },
  { key: 'gpa', title: 'GPA' },
]

export const useScoreCard = () => {
  const dispatch = useAppDispatch()
  const { compulsoryRank, totalRank, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const scoreData = useMemo(
    () => formatScore({ compulsoryRank, totalRank }, rankType, scoreType),
    [compulsoryRank, rankType, scoreType, totalRank]
  )

  const handleScoreTypeChange = (key: ScoreType) => dispatch(setScoreType(key))

  return {
    scoreType,
    scoreData,
    buttonOptions,
    handleScoreTypeChange,
  }
}
