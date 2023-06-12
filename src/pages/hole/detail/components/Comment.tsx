import { CommentForm } from '@/pages/hole/detail/components/CommentForm'
import { View } from 'react-native'
import { HoleDetailCommentList } from '@/pages/hole/detail/components/CommentList'
import React from 'react'
import { HoleBottomAction } from '@/pages/hole/components/sheet/HoleBottomAction'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'

export function HoleDetailComment() {
  return (
    <View className={'h-full'}>
      <HoleDetailCommentList />
      <CommentForm />
    </View>
  )
}
