import type { ScheduleVisibleWeek } from '@/pages/space/@utils/types'
import { WeekChange } from '@/pages/space/components/WeekChange'
import { View } from 'react-native'
import { Text, useTheme, TextProps } from 'react-native-paper'

interface HeaderProps {
  weekScheduleVisibleWeek: ScheduleVisibleWeek[]
  currentWeek: number
  // 0 - 19
  weekIdx: number
}

export const Header = ({
  weekScheduleVisibleWeek,
  currentWeek,
  weekIdx,
}: HeaderProps) => {
  const theme = useTheme()

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
              <Text style={style}>{visibleDate.weekday}</Text>
              <Text style={style} className="text-xs">
                {visibleDate.monthAndDate}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
