import { Pressable, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { UserText } from '@/components/Text/User'
import { TimeText } from '@/components/Text/Time'
import React, { ReactNode } from 'react'
import { AwaitAble, AwaitFunc } from '@/shared/types'
import { LikeIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useMutation } from 'react-query'
import { ReplyBody } from '@/components/reply/body'
import { ImageList } from '@/components/image/ImageList'
import { ReportAction } from '@/pages/hole/detail/ReportAction'
import { ReportType } from '@/shared/validators/report'

type Data =
  | (Omit<IHoleCommentListItem, 'replies' | 'repliesCount'> &
      Partial<Pick<IHoleCommentListItem, 'replies'>>)
  | IHoleReplyListItem

interface Props {
  data: Data
  reqFunc: AwaitFunc
  bottom?: ReactNode
  selectable?: boolean
  onBodyPress?: (data: Data) => AwaitAble
  onLikePress?: () => AwaitAble
  isReply?: boolean
}

export function CommentItem({
  data,
  bottom,
  onBodyPress,
  selectable,
  reqFunc,
  onLikePress,
  isReply,
}: Props) {
  const mutation = useMutation({
    mutationFn: () => reqFunc({ id: data.id }),
  })

  const onLikeIconPress = () => {
    mutation.mutate()
    onLikePress?.()
  }

  return (
    <View
      className={
        'flex flex-row space-x-2 rounded-lg border-b-[1px] py-2 border-black/5'
      }
      key={data.id}
    >
      <View>
        <View className={'w-full flex flex-row items-center space-x-2'}>
          <View className={'w-1/12'}>
            <UserAvatar url={data.user.avatar} size={30} />
          </View>
          <View
            className={'flex flex-row justify-between w-11/12 items-center'}
          >
            <View className={'flex space-y-2'}>
              <UserText username={data.user.username} />
              <TimeText time={data.createAt} />
            </View>
            <ReportAction
              type={isReply ? ReportType.reply : ReportType.comment}
              {...(isReply ? { replyId: data.id } : { commentId: data.id })}
            />
          </View>
        </View>
        <View className={'flex flex-row space-x-2'}>
          <View className={'w-1/12'} />
          <View className={'w-11/12 grid space-y-2'}>
            <View>
              <ImageList imgs={data.imgs} />
            </View>
            <View>
              <Pressable onPress={() => onBodyPress?.(data)}>
                <ReplyBody
                  data={data as IHoleReplyListItem}
                  selectable={selectable}
                />
              </Pressable>
            </View>
            <View className={'flex flex-row items-center space-x-1'}>
              <LikeIcon
                active={data.isLiked}
                size={16}
                onPress={onLikeIconPress}
              />
              <View>
                <SecondaryText style={{ fontSize: 16 }}>
                  {data.favoriteCounts}
                </SecondaryText>
              </View>
            </View>
            <View>{bottom}</View>
          </View>
        </View>
      </View>
    </View>
  )
}
