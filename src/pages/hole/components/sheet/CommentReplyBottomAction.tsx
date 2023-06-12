import React, { useMemo } from 'react'
import { CopyIcon, DangerIcon } from '@/components/icon'
import { copyToClipboard } from '@/shared/utils/keyboard'
import { MoreActionWithSheet } from '@/pages/hole/components/sheet/MoreActionWithSheet'
import { ReportType } from '@/shared/validators/report'

interface Props {
  data: IHoleCommentListItem | IHoleReplyListItem

  type: ReportType
}

export function CommentReplyBottomAction({ data }: Props) {
  const actions = useMemo(
    () => [
      {
        text: '复制评论',
        icon: CopyIcon,
        onPress: () => {
          copyToClipboard(data?.body)
        },
      },
    ],
    []
  )

  return (
    <>
      <MoreActionWithSheet
        list={actions}
        report={{
          type: ReportType.hole,
          id: data?.id,
        }}
      />
    </>
  )
}
