import { useState } from 'react'
import { createStore } from 'hox'

export type ScoreType = 'score' | 'gpa'
export type RankType = 'compulsory' | 'total'

export const [useScoreContext, ScoreContextProvider] = createStore(() => {
  const [scoreType, setScoreType] = useState<ScoreType>('score')
  const [rankType, setRankType] = useState<RankType>('compulsory')

  return {
    scoreType,
    rankType,
    setScoreType,
    setRankType,
  }
})
