import { StatusBar, View } from 'react-native'
import { HoleDetailComment } from '@/pages/hole/detail/components/Comment'
import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'
import React from 'react'
import { useStatusBarContext } from '@/shared/context/statusbar'

export function HoleDetail() {
  const { setWhiteColor } = useStatusBarContext()

  setWhiteColor()

  return (
    <HoleDetailCommentContextProvider>
      <StatusBar backgroundColor={'#fff'} />
      <View className={'bg-white'}>
        <HoleDetailComment />
      </View>
    </HoleDetailCommentContextProvider>
  )
}
