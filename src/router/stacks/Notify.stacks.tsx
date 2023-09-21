import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { InteractiveNotificationScreen } from '@/pages/notify/interaction/NotifyInteraction'
import { Header } from '@/components/Header'
import { SystemNotificationScreen } from '@/pages/notify/system/SystemNotification'
import { PageWithSafeArea } from '@/layouts/layout'

const Stack = createNativeStackNavigator()

export function NotifyStacks() {
  return (
    <PageWithSafeArea topStyle="bg-white">
      <Stack.Navigator
        screenOptions={{
          header: Header,
          statusBarColor: '#fff',
          statusBarStyle: 'dark',
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name={'interaction'}
          options={{
            title: '互动消息',
          }}
          component={InteractiveNotificationScreen}
        />
        <Stack.Screen
          name={'system'}
          options={{
            title: '系统通知',
          }}
          component={SystemNotificationScreen}
        />
      </Stack.Navigator>
    </PageWithSafeArea>
  )
}
