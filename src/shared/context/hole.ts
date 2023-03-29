import { createStore } from 'hox'
import { useImmer } from 'use-immer'

export const [useHolePostContext, HolePostContextProvider] = createStore(() => {
  const [tags, setTags] = useImmer<string[]>([])
  const [imgs, setImgs] = useImmer<string[]>([])
  const [votes, setVotes] = useImmer<string[]>([])

  return {
    tags,
    setTags,
    imgs,
    setImgs,
    votes,
    setVotes,
  }
})
