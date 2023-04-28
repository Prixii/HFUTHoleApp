import { createStore } from 'hox'
import { useState } from 'react'
import {
  HoleDetailCommentMode,
  HoleDetailCommentOrderMode,
} from '@/shared/enums'

export const [useHoleDetailCommentContext, HoleDetailCommentContextProvider] =
  createStore(() => {
    const [mode, setMode] = useState<HoleDetailCommentMode>(
      HoleDetailCommentMode.all
    )

    const [order, setOrder] = useState<HoleDetailCommentOrderMode>(
      HoleDetailCommentOrderMode.favorite
    )

    const isAllMode = mode === HoleDetailCommentMode.all
    const isHotOrder = order === HoleDetailCommentOrderMode.favorite

    return {
      mode,
      setMode,
      isAllMode,
      order,
      setOrder,
      isHotOrder,
    }
  })
