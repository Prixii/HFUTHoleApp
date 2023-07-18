import { Text } from 'react-native-paper'
import { TimeText } from '@/components/Text/Time'
import { Pressable, View } from 'react-native'
import { RightIcon } from '@/components/icon'
import { useNavigateToNotificationTarget } from '@/pages/notify/utils'

export function SystemNotificationItem({
  data,
}: {
  data: INotifySystemListItem
}) {
  const { onNotificationPress } = useNavigateToNotificationTarget(data)

  return (
    <View className={'bg-white rounded-md px-4 pt-4'}>
      <Text variant={'titleMedium'}>{data.title}</Text>
      <TimeText time={data.createAt} />
      <View className={'py-4'}>
        <Text>{data.body}</Text>
      </View>
      <Pressable
        className={
          'border-t-[1px] border-black/5 py-4 flex-row justify-between items-center'
        }
        onPress={onNotificationPress}
      >
        <Text>查看详情</Text>
        <RightIcon />
      </Pressable>
    </View>
  )
}
