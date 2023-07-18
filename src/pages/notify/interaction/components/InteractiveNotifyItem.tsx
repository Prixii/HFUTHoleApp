import { Text, TouchableRipple } from 'react-native-paper'
import { Image, View } from 'react-native'
import { UnreadPointer } from '@/components/UnreadPointer'
import { UserAvatar } from '@/components/UserAvatar'
import { TimeText } from '@/components/Text/Time'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { useNavigateToNotificationTarget } from '@/pages/notify/utils'

interface Props {
  data: INotifyInteractionListItem
}

export function InteractiveNotifyItem({ data }: Props) {
  const { onNotificationPress } = useNavigateToNotificationTarget(data)

  return (
    <TouchableRipple onPress={onNotificationPress}>
      <View
        className={`p-2 justify-between flex-row ${
          !data.isRead && 'bg-gray-200/20'
        }`}
      >
        <View className={'w-10/12 flex-row space-x-4 items-center flex-1'}>
          <View className={'flex-row space-x-1 items-center'}>
            <View className={'w-2'}>{!data.isRead && <UnreadPointer />}</View>
            <View>
              <UserAvatar url={data.creator.avatar} mode={'lg'} />
            </View>
          </View>
          <View className={'flex-1 flex-wrap'}>
            <Text className={'text-lg'}>{data.creator.username}</Text>
            <View className={'space-y-1'}>
              <EmojiableText
                body={data.body}
                secondary={true}
                variant={'bodyMedium'}
              />
              <View>
                <TimeText time={data.createAt} />
              </View>
            </View>
          </View>
        </View>
        <View className={'w-2/12 h-20 flex items-center'}>
          {data.hole?.imgs?.length ? (
            <Image
              source={{
                uri: data.hole?.imgs[0],
              }}
              className={'w-16 h-20 rounded-md'}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableRipple>
  )
}
