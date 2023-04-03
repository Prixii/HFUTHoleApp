import { createStore } from 'hox'
import { useImmer } from 'use-immer'
import { useForm } from 'react-hook-form'
import { PostHoleValidator } from '@/shared/validators/hole'
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator'
import { useState } from 'react'
import { HoleListMode } from '@/shared/enums'

export const [useHolePostContext, HolePostContextProvider] = createStore(() => {
  const [tags, setTags] = useImmer<string[]>([])
  const [imgs, setImgs] = useImmer<string[]>([])
  const [votes, setVotes] = useImmer<string[]>([])

  const {
    formState: { errors },
    ...form
  } = useForm<PostHoleValidator>({
    resolver: classValidatorResolver(PostHoleValidator),
  })

  return {
    form,
    tags,
    setTags,
    imgs,
    setImgs,
    votes,
    setVotes,
  }
})

export const [useHoleListContext, HoleListContextProvider] = createStore(() => {
  const [mode, setMode] = useState(HoleListMode.random)

  return {
    mode,
    setMode,
  }
})
