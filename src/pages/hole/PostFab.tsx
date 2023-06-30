import { useLinkTo } from '@react-navigation/native'
import { PostFAB } from '@/components/PostFAB'
import { useCallback } from 'react'

export function HolePostFAB() {
  const linkTo = useLinkTo()

  const onPress = useCallback(() => {
    linkTo('/hole/post')
  }, [linkTo])

  return <PostFAB onPress={onPress} />
}
