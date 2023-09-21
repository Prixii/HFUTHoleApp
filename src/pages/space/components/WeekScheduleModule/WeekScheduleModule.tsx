import { PlainPage } from '@/components/Page'
import { ScheduleScrollWrapper } from '@/pages/space/components/ScheduleScrollWrapper'
import { View } from 'react-native'
import { type ReactNode } from 'react'

interface WeekScheduleModuleProps {
  header: ReactNode
  scheduleList: ReactNode
  absoluteBottom?: ReactNode
  customNode?: ReactNode
  isFetching: boolean
  onRefresh?: () => void
}

export const WeekScheduleModule = ({
  header,
  scheduleList,
  absoluteBottom,
  customNode,
  isFetching,
  onRefresh,
}: WeekScheduleModuleProps) => {
  return (
    <PlainPage>
      <View className="w-full h-24 absolute z-[1] top-0 left-0">{header}</View>

      <ScheduleScrollWrapper isFetching={isFetching} onRefresh={onRefresh}>
        <View className="my-24 w-full">{scheduleList}</View>
      </ScheduleScrollWrapper>

      {absoluteBottom}
      {customNode}
    </PlainPage>
  )
}
