import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { MaskModal } from '@/components/MaskModal'
import { CommentInputForm } from '@/pages/hole/detail/components/CommentInputForm'
import React from 'react'

export function CommentMaskModal() {
  const { showInput, closeInput } = useBottomCommentContext()

  return (
    <MaskModal visible={showInput} onClose={() => closeInput()}>
      <CommentInputForm onCommentSuccess={() => closeInput(true)} />
    </MaskModal>
  )
}
