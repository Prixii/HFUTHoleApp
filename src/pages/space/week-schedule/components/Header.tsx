import { useScheduleVisibleWeek } from '@/pages/space/@utils/useScheduleVisibleWeek'
import { WeekChange } from '@/pages/space/components/WeekChange'
import { View } from 'react-native'
import { useWeekSchedule } from '@/pages/space/week-schedule/useWeekSchedule'
import { Text, useTheme, TextProps } from 'react-native-paper'

export const Header = () => {
  const theme = useTheme()
  const weekScheduleVisibleWeek = useScheduleVisibleWeek('weekSchedule')
  const {
    currentWeek,
    weekSchedule: { weekIdx },
  } = useWeekSchedule()

  return (
    <View className="w-full">
      <WeekChange
        scheduleKey="weekSchedule"
        text={`第${weekIdx + 1}周${
          currentWeek !== weekIdx + 1 ? `(当前是第${currentWeek}周)` : ''
        }`}
      />

      <View className="flex flex-row mt-2 gap-2">
        {weekScheduleVisibleWeek.map((visibleDate) => {
          const style = {
            textAlign: 'center',
            color: visibleDate.active ? '#217DD2' : theme.colors.surfaceVariant,
          } as TextProps<null>['style']
          return (
            <View key={visibleDate.day} className="flex-1">
              <Text style={style}>{visibleDate.month}</Text>
              <Text style={style}>{visibleDate.day}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
