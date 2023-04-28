import { CommentForm } from '@/pages/hole/detail/components/CommentForm'
import { View } from 'react-native'
import { HoleDetailCommentList } from '@/pages/hole/detail/components/CommentList'
import React from 'react'

export function HoleDetailComment() {
  return (
    <View className={'h-full'}>
      <HoleDetailCommentList />
      <CommentForm />
    </View>
  )
}
