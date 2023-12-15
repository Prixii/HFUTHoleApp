import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { InteractiveNotificationScreen } from '@/pages/notify/interaction/NotifyInteraction'
import { Header } from '@/components/Header'
import { SystemNotificationScreen } from '@/pages/notify/system/SystemNotification'
import { SafeAreaView } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

export function NotifyStacks() {
  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <Stack.Navigator
        screenOptions={{
          header: Header,
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
    </SafeAreaView>
  )
}
