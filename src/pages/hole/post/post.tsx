import { View } from 'react-native'
import { HolePostBody } from '@/pages/hole/post/body'
import { HolePostContextProvider } from '@/shared/context/hole'
import { HolePostHeader } from '@/pages/hole/post/header'

export function HolePost() {
  return (
    <HolePostContextProvider>
      <View className={'min-h-screen bg-[#43A047]/10 px-2'}>
        <HolePostHeader />
        <HolePostBody />
      </View>
    </HolePostContextProvider>
  )
}
