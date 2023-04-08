import React, { ReactNode, useState } from 'react'
import { Func, IClassName } from '@/shared/types'
import {
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { Text, useTheme } from 'react-native-paper'
import { CommentIcon, LikeIcon } from '@/components/icon'
import { Badges } from '@/components/Badges'
import { IdText } from '@/components/Text/Id'
import { TimeText } from '@/components/Text/Time'
import { useSearchNavigation } from '@/shared/hooks/useSearchNavigation'
import { ZoomImage } from '@/components/image/ZoomImage'

type Data = IHole

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

const HoleInfoImages: React.FC<{
  imgs?: string[]
}> = ({ imgs }) => {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  const theme = useTheme()

  const open = () => {
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
  }

  // TODO 我也不想这么做的，但rn的flex布局似乎不同于网页，我实在是没什么好思路了，欢迎PR
  const ImageRenderItem = ({ img, i }: { img: string; i: number }) => {
    return (
      <Pressable
        onPress={() => {
          setIndex(i)
          open()
        }}
        className={'h-full flex-1 px-1'}
      >
        <Image
          source={{
            uri: img,
          }}
          className={'rounded-lg h-56'}
          style={{
            resizeMode: 'cover',
            backgroundColor: theme.colors.onBackground,
          }}
          key={index}
        />
      </Pressable>
    )
  }

  return (
    <View>
      {imgs?.length ? (
        <View>
          <Modal visible={visible} transparent={true} onRequestClose={close}>
            <ZoomImage
              imageUrls={imgs.map((img) => ({ url: img }))}
              index={index}
              close={close}
            />
          </Modal>
          <View className={'w-full'}>
            <View className={'flex flex-row'}>
              {imgs.slice(0, 2).map((img, index) => (
                <ImageRenderItem img={img} i={index} key={index} />
              ))}
            </View>
            <View className={'flex flex-row mt-2'}>
              {imgs.slice(2, 4).map((img, index) => (
                <ImageRenderItem img={img} i={index + 2} key={index + 2} />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

const HoleInfoBody: React.FC<{ data: Data }> = ({ data }) => {
  const { searchWithKeywords } = useSearchNavigation()

  return (
    <View className={'flex flex-col space-y-3'}>
      {data.imgs.length > 0 && <HoleInfoImages imgs={data?.imgs} />}
      <View>
        <Badges
          data={data.tags}
          onPress={(tag) => searchWithKeywords(`#${tag}`)}
        />
      </View>
      <View>
        <Text variant={'bodyMedium'}>{data.body}</Text>
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
      value: data.commentsCount,
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
        <View>{bottom || <HoleInfoIcons data={data} />}</View>
        {showComment && (
          <View className={'w-full grid gap-2'}>
            {data.comments.map((comment) => (
              <View
                className={
                  'flex flex-row space-x-5 items-center py-3 border-b-[1px] border-black/5'
                }
              >
                <Text className={'font-bold'}>{comment.user.username}</Text>
                <Text
                  className={'text-xs'}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
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
