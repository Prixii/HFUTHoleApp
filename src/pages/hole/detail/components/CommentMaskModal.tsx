import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { CommentInputForm } from '@/pages/hole/detail/components/CommentInputForm'
import React from 'react'
import { Modal } from 'native-base'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'

export function CommentMaskModal() {
  const { showInput, closeInput } = useBottomCommentContext()
  const route = useRoute()
  const { id } = route.params as { id: number }

  console.log('[id]' + id)
  return (
    <>
      <Modal
        isOpen={showInput}
        onClose={() => closeInput()}
        animationPreset={'slide'}
      >
        <View className={'absolute left-0 right-0 top-0 bottom-0'}>
          <CommentInputForm onCommentSuccess={() => closeInput(true)} id={id} />
        </View>
      </Modal>
    </>
  )
}
