import { createStore } from 'hox'
import { useState } from 'react'
import { HoleDetailCommentMode } from '@/shared/enums'

export const [useHoleDetailCommentContext, HoleDetailCommentContextProvider] =
  createStore(() => {
    const [mode, setMode] = useState<HoleDetailCommentMode>(
      HoleDetailCommentMode.all
    )

    const isAllMode = mode === HoleDetailCommentMode.all

    return {
      mode,
      setMode,
      isAllMode,
    }
  })
