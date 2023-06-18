import { useDaySchedule } from '@/pages/space/day-schedule/hooks/useDaySchedule'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { AngleLeftIcon, AngleRightIcon } from '@/components/icon'

export const Header = () => {
  const { visibleDate, daySchedule } = useDaySchedule()

  return (
    <View className="px-4">
      <Text variant="headlineMedium" className="font-bold">
        {visibleDate}
      </Text>
      <Text className="bodySmall text-[#9499AA]">
        你今天有
        <Text className="text-[#4981F9]">1</Text>
        节课
      </Text>
      <View className="flex flex-row justify-between items-center">
        <IconButton icon={() => <AngleLeftIcon size={20} />} transparent />
        <Text variant="bodyLarge">{`第${daySchedule.weekIdx + 1}周`}</Text>
        <IconButton icon={() => <AngleRightIcon size={20} />} transparent />
      </View>
    </View>
  )
}
