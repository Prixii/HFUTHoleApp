import { useNavigation } from '@react-navigation/native'

export function useUserProfileRoute() {
  const navigation = useNavigation()

  const goTo = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('user', {
      screen: 'profile',
    })
  }

  return {
    goTo,
  }
}
