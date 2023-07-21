import { KeyboardAvoidingView } from 'react-native'
import { Dialog } from 'react-native-paper'
import { PlainPage } from '@/components/Page'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { LoginForm } from '@/pages/space/day-schedule/components/LoginForm'
import { getQAQFont } from '@/shared/utils/utils'
import { Header } from '@/pages/space/day-schedule/components/Header'
import { ScheduleList } from '@/pages/space/day-schedule/components/ScheduleList'
import { useSpaceUserInfo } from '@/swr/space/user'
import { ScheduleScrollWrapper } from '@/pages/space/components/ScheduleScrollWrapper'

export const DaySchedule = () => {
  const { isLogin } = useAuth()
  useSpaceUserInfo()

  return (
    <KeyboardAvoidingView behavior="padding">
      <PlainPage>
        <ScheduleScrollWrapper>
          <Header />
          <ScheduleList />
        </ScheduleScrollWrapper>

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
