import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

export function useUserProfileRoute() {
  const navigation = useNavigation()

  const goTo = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('User', {
      screen: 'profile',
    })
  }, [navigation])

  return {
    goTo,
  }
}
