import { View, KeyboardAvoidingView } from 'react-native'
import { Dialog, Button } from 'react-native-paper'
import { PlainPage } from '@/components/Page'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { LoginForm } from '@/pages/space/day-schedule/components/LoginForm'
import { getQAQFont } from '@/shared/utils/utils'
import { useSpaceCourse } from '@/swr/space/course'
import { Header } from '@/pages/space/day-schedule/components/Header'
import { ScheduleList } from '@/pages/space/day-schedule/components/ScheduleList'
import { useCourseRefresh } from '@/pages/space/@utils/useCourseRefresh'
import { useSpaceUserInfo } from '@/swr/space/user'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'
import { ScreenWrapper } from '@/components/ScrollWrapper'

export const DaySchedule = () => {
  const { isLogin, logout } = useAuth()
  useSpaceCourse()
  useSpaceUserInfo()
  const { isRefreshing, enabled, onRefresh } = useCourseRefresh()

  return (
    <KeyboardAvoidingView behavior="padding">
      <PlainPage>
        <ScreenWrapper
          contentContainerStyle={{
            minHeight: '100%',
          }}
          refreshControl={
            <RefreshIndicatorControl
              refreshing={isRefreshing}
              enabled={enabled}
              onRefresh={onRefresh}
            />
          }
        >
          <View>
            <Header />
            <ScheduleList />
          </View>
        </ScreenWrapper>

        <Dialog visible={!isLogin} dismissable={false}>
          <Dialog.Title>{`请先登录课表 ${getQAQFont('happy')}`}</Dialog.Title>
          <Dialog.Content>
            <LoginForm />
          </Dialog.Content>
        </Dialog>
      </PlainPage>
    </KeyboardAvoidingView>
  )
}
