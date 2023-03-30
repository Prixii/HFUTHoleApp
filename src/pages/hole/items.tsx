import React from 'react'
import { Func, InferArrayItem } from '@/shared/types'
import { Image, TouchableWithoutFeedback, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { Text, useTheme } from 'react-native-paper'
import { CommentIcon, LikeIcon } from '@/components/icon'
import { formatDate } from '@/shared/utils/utils'
import { Badges } from '@/components/Badges'
import { IdText } from '@/components/Text/Id'

type Data = InferArrayItem<IHoleListResponse['items']>

const ItemHeader: React.FC<{ data: Data }> = ({ data }) => {
  const theme = useTheme()

  return (
    <View className={'flex flex-row items-center space-x-3'}>
      <UserAvatar url={data.user.avatar} />
      <View className={'grid space-y-1'}>
        <IdText id={data.id} />
        <Text variant={'bodySmall'}>{formatDate(data.createAt)}</Text>
      </View>
    </View>
  )
}

const ItemImages: React.FC<{
  imgs?: string[]
}> = ({ imgs }) => {
  return (
    <View>
      {imgs?.length ? (
        <View className={'flex flex-row gap-2'}>
          {imgs.map((img, index) => (
            <Image
              source={{
                uri: 'https://tenfei04.cfp.cn/creative/vcg/veer/1600water/veer-147317368.jpg',
              }}
              className={'w-full h-28 rounded-lg'}
              style={{
                resizeMode: 'cover',
              }}
              key={index}
            />
          ))}
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

const ItemBody: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <View className={'flex flex-col space-y-3'}>
      <ItemImages imgs={data?.imgs} />
      <View>
        <Badges data={data.tags} />
      </View>
      <Text variant={'bodyMedium'}>{data.body}</Text>
    </View>
  )
}

const ItemIcons: React.FC<{ data: Data }> = ({ data }) => {
  const renderList = [
    {
      value: data.favoriteCounts,
      element: <LikeIcon size={20} color={'#686E87'} />,
    },
    {
      value: data.commentsCount,
      element: <CommentIcon size={20} color={'#686E87'} />,
    },
  ]

  return (
    <View className={'flex flex-row justify-between'}>
      {renderList.map((icon) => (
        <View className={'flex flex-row items-center space-x-2'}>
          {icon.element}
          <Text className={'text-[#686E87]'}>{icon.value}</Text>
        </View>
      ))}
    </View>
  )
}

export const HoleItem: React.FC<{
  data: Data
  onPress?: Func
}> = ({ data, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className={'flex flex-col space-y-3 p-4 bg-white rounded-lg mt-2'}>
        <ItemHeader data={data} />
        <View>
          <ItemBody data={data} />
        </View>
        <View>
          <ItemIcons data={data} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
