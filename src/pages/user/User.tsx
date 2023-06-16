import { Text, View } from 'react-native'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button } from '@/components/button'

export function User() {
  const { logout } = useAuth()

  return (
    <View>
      <Text>User</Text>
      <Button onPress={() => logout()}>退出</Button>
    </View>
  )
}
