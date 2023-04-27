import { PostFAB } from '@/components/PostFAB'
import { FABProps } from 'react-native-paper'

export function CommentPostFAB(props: Partial<FABProps>) {
  return <PostFAB icon={'pencil'} {...props}></PostFAB>
}
