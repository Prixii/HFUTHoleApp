import { useLinkTo } from '@react-navigation/native'
import { PostFAB } from '@/components/PostFAB'

export function HolePostFAB() {
  const linkTo = useLinkTo()

  return <PostFAB onPress={() => linkTo('/hole/post')} />
}
