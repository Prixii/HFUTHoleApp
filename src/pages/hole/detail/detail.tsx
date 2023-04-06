import { StatusBar, View } from 'react-native'
import { HoleDetailComment } from '@/pages/hole/detail/Comment'
import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'

export function HoleDetail() {
  return (
    <HoleDetailCommentContextProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View className={'bg-white'}>
        <HoleDetailComment />
      </View>
    </HoleDetailCommentContextProvider>
  )
}
