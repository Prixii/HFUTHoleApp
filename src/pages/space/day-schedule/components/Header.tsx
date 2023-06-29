import { useDaySchedule } from '@/pages/space/day-schedule/useDaySchedule'
import { Text } from 'react-native-paper'
import { View, Pressable } from 'react-native'
import { format } from 'date-fns'
import { IconButton } from '@/components/IconButton'
import { AngleLeftIcon, AngleRightIcon } from '@/components/icon'
import { useScheduleVisibleWeek } from '@/pages/space/@utils/useScheduleVisibleWeek'
import { useChangeWeek } from '@/pages/space/@utils/useWeekChange'
import { useAppDispatch } from '@/store/store'
import { setDaySchedule } from '@/store/reducer/spaceCourse'
import { useCallback } from 'react'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

export const Header = () => {
  const { visibleDate, daySchedule, todaySchedule } = useDaySchedule()
  const dayScheduleVisibleWeek = useScheduleVisibleWeek('daySchedule')
  const { onPrev, onNext } = useChangeWeek()
  const dispatch = useAppDispatch()

  const handleActiveChange = useCallback(
    (index: number) => {
      dispatch(setDaySchedule({ ...daySchedule, dayIdx: index }))
    },
    [dispatch, daySchedule, setDaySchedule]
  )

  return (
    <View className="px-4">
      <Text variant="headlineMedium" className="font-bold">
        {visibleDate}
      </Text>

      <Text className="bodySmall text-[#9499AA]">
        你今天有
        <Text className="text-[#4981F9]">{todaySchedule.length}</Text>
        项安排
      </Text>

      <View className="flex flex-row justify-between items-center">
        <IconButton
          icon={() => <AngleLeftIcon size={20} />}
          transparent
          onPress={onPrev}
        />
        <Text variant="bodyLarge">{`第${daySchedule.weekIdx + 1}周`}</Text>
        <IconButton
          icon={() => <AngleRightIcon size={20} />}
          transparent
          onPress={onNext}
        />
      </View>

      <View className="flex flex-row mt-2 gap-2">
        {dayScheduleVisibleWeek.map(({ active, date }, index) => (
          <Pressable
            key={index}
            className="flex-1"
            onPress={() => handleActiveChange(index)}
          >
            <VisibleWeekItem active={active} date={date} />
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const VisibleWeekItem = ({ active, date }: { date: Date; active: boolean }) => {
  const color = useDerivedValue(() => (active ? '#fff' : '#94a3b8'), [active])
  const backgroundColor = useDerivedValue(
    () => (active ? '#4981F9' : '#EDEFF3'),
    [active]
  )

  const boxStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value),
    }
  })
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(color.value),
    }
  })

  return (
    <Animated.View
      className={`rounded-md bg-[#EDEFF3] py-3 ${active ? 'bg-[#4981F9]' : ''}`}
      style={boxStyle}
    >
      <Animated.Text
        className={`mx-auto text-slate-400 ${active ? 'text-white' : ''}`}
        style={textStyle}
      >
        {format(date, 'EEE.')}
      </Animated.Text>
      <Animated.Text
        className={`mx-auto text-slate-400 ${active ? 'text-white' : ''}`}
        style={textStyle}
      >
        {format(date, 'dd')}
      </Animated.Text>
    </Animated.View>
  )
}
