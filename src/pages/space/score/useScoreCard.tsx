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

const scoreInfos: ScoreInfo[] = [
  {
    key: 'mine',
    title: '我的成绩',
    Icon: <UserIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: <UserFriendsIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: <FireIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
  {
    key: 'max',
    title: '专业最高',
    Icon: <AwardIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
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
    scoreInfos,
    handleScoreTypeChange,
  }
}
