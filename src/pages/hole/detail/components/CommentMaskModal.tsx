import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { CommentInputForm } from '@/pages/hole/detail/components/CommentInputForm'
import React from 'react'
import { Modal } from 'native-base'
import { Platform, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function CommentMaskModal() {
  const { showInput, closeInput } = useBottomCommentContext()
  const route = useRoute()
  const { id } = route.params as { id: number }

  const renderTouchable = () => {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity onPress={() => closeInput(true)}>
          <View className="ocapcity-0 h-full"></View>
        </TouchableOpacity>
      )
    }
  }
  return (
    <>
      <Modal
        isOpen={showInput}
        onClose={() => closeInput()}
        animationPreset={'slide'}
      >
        <View className={'absolute left-0 right-0 top-0 bottom-0'}>
          {renderTouchable()}
          <CommentInputForm onCommentSuccess={() => closeInput(true)} id={id} />
        </View>
      </Modal>
    </>
  )
}
