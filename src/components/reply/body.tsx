import { Text } from 'react-native-paper'
import { PrimaryText } from '@/components/Text/PrimaryText'
import React from 'react'

interface Props {
  selectable?: boolean
  data: IHoleReplyListItem
}

export function ReplyBody({ selectable, data }: Props) {
  return (
    <Text selectable={selectable}>
      {data.replyUser && (
        <>
          <Text>回复 </Text>
          <PrimaryText>@{data.replyUser.username}：</PrimaryText>
        </>
      )}
      {data.body}
    </Text>
  )
}
