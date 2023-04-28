import React from 'react'
import { PostHoleCommentReplyRequest } from '@/request/apis/hole'
import { useHoleComment } from '@/swr/hole'
import { BottomSheetReply, ReplyProps } from '@/components/reply/reply'
import { ReplyForm } from '@/components/reply/Form'

// TODO 重构乐观更新
export function HoleCommentReply(
  props: Omit<ReplyProps, 'children'> & { page: number }
) {
  const { setReply } = useHoleComment()

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
        onReply={(body) => setReply(props.data, props.page, body)}
      />
    </BottomSheetReply>
  )
}
