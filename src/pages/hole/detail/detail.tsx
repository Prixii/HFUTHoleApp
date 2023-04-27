import { StatusBar, View } from 'react-native'
import { HoleDetailComment } from '@/pages/hole/detail/components/Comment'
import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'
import React from 'react'

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
