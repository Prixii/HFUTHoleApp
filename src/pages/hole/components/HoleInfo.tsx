import React, { ReactNode, useState } from 'react'
import { Func, IClassName, InferArrayItem } from '@/shared/types'
import { TouchableWithoutFeedback, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { Text } from 'react-native-paper'
import { CommentIcon, LikeIcon } from '@/components/icon'
import { Badges } from '@/components/Badges'
import { IdText } from '@/components/Text/Id'
import { TimeText } from '@/components/Text/Time'
import { useSearchNavigation } from '@/shared/hooks/useSearchNavigation'
import { ImageList } from '@/components/image/ImageList'
import { useMutation } from 'react-query'
import { PostHoleVoteRequest } from '@/request/apis/hole'
import { Toast } from '@/shared/utils/toast'
import { HoleVoteItem } from '@/pages/hole/components/VoteItem'
import { SecondaryText } from '@/components/Text/SecondaryText'

type Data = IHole

type VoteItem = InferArrayItem<Data['vote']['items']>

const HoleInfoVote: React.FC<{ data: Data }> = ({ data }) => {
  const [onSuccess, setOnSuccess] = useState<Func>()

  const mutation = useMutation({
    mutationKey: [data.vote.id, data.vote.isVoted],
    mutationFn: (ids: string[]) =>
      PostHoleVoteRequest({
        id: data.vote.id,
        ids,
      }),
    onSuccess() {
      Toast.success({
        text1: '投票成功',
      })
      // onSuccess?.()
    },
  })

  const onVotePress = (item: VoteItem, func) => {
    if (data.vote.isVoted) {
      return
    }

    if (data.vote.type === 'single') {
      mutation.mutate([item.id])
    }

    setOnSuccess(func)
  }

  return (
    <View>
      <View className={'grid space-y-2'}>
        {data.vote.items.map((item) => (
          <View>
            <HoleVoteItem
              data={item}
              hole={data}
              onPress={(item, func) => onVotePress(item, func)}
            />
          </View>
        ))}
        {data.vote.isVoted && (
          <View className={'flex flex-row justify-end w-full'}>
            <SecondaryText>
              一共有{data.vote.totalCount}人参与投票
            </SecondaryText>
          </View>
        )}
      </View>
    </View>
  )
}

const HoleInfoHeader: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <View className={'flex flex-row items-center space-x-3'}>
      <UserAvatar url={data.user.avatar} />
      <View className={'grid space-y-1'}>
        <IdText id={data.id} />
        <TimeText time={data.createAt} />
      </View>
    </View>
  )
}

const HoleInfoBody: React.FC<{ data: Data }> = ({ data }) => {
  const { searchWithKeywords } = useSearchNavigation()

  return (
    <View className={'flex flex-col space-y-3'}>
      <ImageList imgs={data?.imgs} />
      <View>
        <Badges
          data={data.tags}
          onPress={(tag) => searchWithKeywords(`#${tag}`)}
        />
      </View>
      <View>
        <Text variant={'bodyLarge'} selectable={true}>
          {data.body}
        </Text>
      </View>
    </View>
  )
}

const HoleInfoIcons: React.FC<{ data: Data }> = ({ data }) => {
  const renderList = [
    {
      value: data.favoriteCounts,
      element: <LikeIcon size={20} color={'#686E87'} />,
    },
    {
      value: data.commentCounts,
      element: <CommentIcon size={20} color={'#686E87'} />,
    },
  ]

  return (
    <View className={'flex flex-row justify-between'}>
      {renderList.map((icon, index) => (
        <View className={'flex flex-row items-center space-x-2'} key={index}>
          {icon.element}
          <Text className={'text-[#686E87]'}>{icon.value}</Text>
        </View>
      ))}
    </View>
  )
}

interface Props extends IClassName {
  data: Data
  onPress?: Func
  header?: ReactNode
  body?: ReactNode
  bottom?: ReactNode
  showComment?: boolean
}

export function HoleInfo({
  data,
  onPress,
  header,
  body,
  bottom,
  className,
  showComment = true,
}: Props) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        className={`flex flex-col space-y-3 p-4 bg-white rounded-lg mt-2 ${className}`}
      >
        <View>{header || <HoleInfoHeader data={data} />}</View>
        <View>{body || <HoleInfoBody data={data} />}</View>
        <View>{data.vote && <HoleInfoVote data={data} />}</View>
        <View>{bottom || <HoleInfoIcons data={data} />}</View>
        {showComment && (
          <View className={'grid gap-2'}>
            {data.comments?.length > 0 &&
              data.comments.map((comment) => (
                <View
                  className={
                    'flex flex-row space-x-5 items-center py-3 border-b-[1px] border-black/10'
                  }
                >
                  <Text className={'font-bold'}>{comment.user.username}</Text>
                  <Text
                    className={'flex-1'}
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                  >
                    {comment.body}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
