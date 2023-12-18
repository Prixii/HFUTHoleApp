import { KeyboardAvoidingView, View } from 'react-native'
import { PlainPage } from '@/components/Page'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'
import { Header } from '@/pages/space/day-schedule/components/Header'
import { ScheduleList } from '@/pages/space/day-schedule/components/ScheduleList'
import { ScheduleScrollWrapper } from '@/pages/space/components/ScheduleScrollWrapper'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useInitializeSpace } from '@/pages/space/@utils/useInitializeSpace'
import { useSpaceCourse } from '@/swr/space/course'
import { SafeAreaView } from 'react-native-safe-area-context'

export const DaySchedule = () => {
  const { isFetching, refetch } = useSpaceCourse()
  const { isLogin } = useSpaceAuth()
  useInitializeSpace()

  const isFocused = useIsFocused()

  const [isDialogVisible, setDialogVisible] = useState(false)

  useEffect(() => {
    if (!isLogin && isFocused) {
      setDialogVisible(true)
    } else {
      setDialogVisible(false)
    }
  }, [isLogin, isFocused])

  return (
    <View className={'flex-1'}>
      <ScheduleScrollWrapper isFetching={isFetching} onRefresh={refetch}>
        <Header />
        <ScheduleList />
      </ScheduleScrollWrapper>
    </View>
  )
}
