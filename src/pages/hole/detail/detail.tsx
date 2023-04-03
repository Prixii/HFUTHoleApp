import { Page } from '@/components/Page'
import { StatusBar, View } from 'react-native'
import { HoleDetailComment } from '@/pages/hole/detail/Comment'
import React from 'react'
import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'

export function HoleDetail() {
  return (
    <HoleDetailCommentContextProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Page className={'w-screen'}>
        <HoleDetailHeader />
        <View className={'mt-20 bg-white'}>
          <HoleDetailComment />
        </View>
      </Page>
    </HoleDetailCommentContextProvider>
  )
}
