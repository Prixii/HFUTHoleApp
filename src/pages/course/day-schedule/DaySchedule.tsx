import {
  View,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native'
import { Dialog, Button } from 'react-native-paper'
import { Page } from '@/components/Page'
import { useCallback, useState } from 'react'
import { useAuth } from '@/shared/hooks/useSpaceAuth'
import { LoginForm } from '@/pages/course/day-schedule/components/LoginForm'
import { getQAQFont } from '@/shared/utils/utils'

export const DaySchedule = () => {
  const [refreshing, setRefreshing] = useState(false)

  const { isLogin, logout } = useAuth()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding">
      <Page>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
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
            退出
          </Button>
        </ScrollView>

        <Dialog visible={!isLogin} dismissable={false}>
          <Dialog.Title>{`请先登录课表 ${getQAQFont('happy')}`}</Dialog.Title>
          <Dialog.Content>
            <LoginForm />
          </Dialog.Content>
        </Dialog>
      </Page>
    </KeyboardAvoidingView>
  )
}
