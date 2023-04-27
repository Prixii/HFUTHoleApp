import React from 'react'
import { PostHoleCommentReplyRequest } from '@/request/apis/hole'
import { useHoleComment } from '@/swr/hole'
import { BottomSheetReply, ReplyProps } from '@/components/reply/reply'
import { ReplyForm } from '@/components/reply/Form'

export function HoleCommentReply(props: Omit<ReplyProps, 'children'>) {
  const { invalidAll } = useHoleComment()

  return (
    <BottomSheetReply {...props}>
      <ReplyForm
        data={props.data}
        closeModal={() => props.setOpen(false)}
        reqFunc={(body) =>
          PostHoleCommentReplyRequest({
            body,
            commentId: props.data.id,
          })
        }
        invalidAll={invalidAll}
      />
    </BottomSheetReply>
  )
}
