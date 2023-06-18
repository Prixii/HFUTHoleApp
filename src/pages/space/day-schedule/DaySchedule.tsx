import {
  View,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native'
import { Dialog, Button } from 'react-native-paper'
import { PlainPage } from '@/components/Page'
import { useCallback } from 'react'
import { useAuth } from '@/shared/hooks/useSpaceAuth'
import { LoginForm } from '@/pages/space/day-schedule/components/LoginForm'
import { getQAQFont } from '@/shared/utils/utils'
import { useSpaceCourse } from '@/swr/space/course'
import { Header } from '@/pages/space/day-schedule/components/Header'

export const DaySchedule = () => {
  const { isLogin, logout } = useAuth()
  const { refetch, isLoading } = useSpaceCourse()

  const onRefresh = useCallback(() => refetch(false), [refetch])

  return (
    <KeyboardAvoidingView behavior="padding">
      <PlainPage>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              enabled={isLogin}
              onRefresh={onRefresh}
            />
          }
        >
          <Button
            onPress={() => {
              logout()
            }}
          >
            退出登录
          </Button>
          <Header />
        </ScrollView>

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
