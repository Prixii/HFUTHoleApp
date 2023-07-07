import { useLinkTo } from '@react-navigation/native'
import { PostFAB } from '@/components/PostFAB'
import { useCallback } from 'react'
import { useHoleList } from '@/swr/hole'

export function HolePostFAB() {
  const linkTo = useLinkTo()
  const { invalidateQuery } = useHoleList()

  const onPress = useCallback(() => {
    invalidateQuery()
    linkTo('/hole/post')
  }, [invalidateQuery, linkTo])

  return <PostFAB onPress={onPress} />
}
