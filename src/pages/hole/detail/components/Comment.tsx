import { View } from 'react-native'
import { HoleDetailCommentList } from '@/pages/hole/detail/components/CommentList'
import React from 'react'
import { CommentBottomInput } from '@/pages/hole/detail/components/CommentBottomInput'
import { CommentMaskModal } from '@/pages/hole/detail/components/CommentMaskModal'

export function HoleDetailComment() {
  return (
    <View className={'h-full'}>
      <HoleDetailCommentList />
      <CommentBottomInput />
      <CommentMaskModal />
    </View>
  )
}
