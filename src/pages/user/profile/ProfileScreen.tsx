import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Page } from '@/components/Page'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserPostedHoleList } from '@/swr/user/hole'

export function ProfileScreen() {
  const { isLoading } = useUserPostedHoleList()

  return (
    <LoadingScreen isLoading={isLoading}>
      <Page>
        <Text>1</Text>
      </Page>
    </LoadingScreen>
  )
}
