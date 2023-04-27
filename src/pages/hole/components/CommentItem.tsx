import { Pressable, TouchableNativeFeedback, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { UserText } from '@/components/Text/User'
import { TimeText } from '@/components/Text/Time'
import { Text } from 'react-native-paper'
import React, { ReactNode } from 'react'
import { AwaitAble, AwaitFunc } from '@/shared/types'
import { LikeIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useMutation } from 'react-query'
import { IconButton } from '@/components/IconButton'
import { PrimaryText } from '@/components/Text/PrimaryText'
import { ReplyBody } from '@/components/reply/body'

type Data =
  | (Omit<IHoleCommentListItem, 'replies' | 'repliesCount'> &
      Partial<Pick<IHoleCommentListItem, 'replies' | 'repliesCount'>>)
  | IHoleReplyListItem

interface Props {
  data: Data
  reqFunc: AwaitFunc
  bottom?: ReactNode
  selectable?: boolean
  onBodyPress?: (data: Data) => AwaitAble
  onLikePress?: () => AwaitAble
}

export function CommentItem({
  data,
  bottom,
  onBodyPress,
  selectable,
  reqFunc,
  onLikePress,
}: Props) {
  const mutation = useMutation({
    mutationFn: () => reqFunc({ id: data.id }),
    onSuccess() {
      onLikePress()
    },
  })

  return (
    <View
      className={
        'flex flex-row space-x-2 rounded-lg py-3 border-b-[1px] border-black/5'
      }
      key={data.id}
    >
      <View className={'w-1/12'}>
        <UserAvatar url={data.user.avatar} size={30} />
      </View>
      <View className={'grid space-y-2 w-11/12'}>
        <TouchableNativeFeedback onPress={() => onBodyPress?.(data)}>
          <View className={'w-full grid gap-2'}>
            <View className={'flex space-y-2'}>
              <UserText username={data.user.username} />
              <TimeText time={data.createAt} />
              <ReplyBody
                data={data as IHoleReplyListItem}
                selectable={selectable}
              />
            </View>
            <View className={'flex flex-row items-center space-x-1'}>
              <LikeIcon
                active={data.isLiked}
                size={16}
                onPress={() => {
                  mutation.mutate()
                }}
              />
              <View>
                <SecondaryText style={{ fontSize: 16 }}>
                  {data.favoriteCounts}
                </SecondaryText>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
        <View>{bottom}</View>
      </View>
    </View>
  )
}
