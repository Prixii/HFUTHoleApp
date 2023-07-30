import { useLinkTo, useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

export function useUserProfileRoute() {
  const navigation = useNavigation()
  const linkTo = useLinkTo()

  const goTo = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('user-nested', {
      screen: 'profile',
    })
  }, [navigation])

  const goEditScreen = () => {
    linkTo('/user-nested/edit-profile')
  }

  const goEditUsernameScreen = () => {
    linkTo('/user-nested/edit-username')
  }

  return {
    goTo,
    goEditScreen,
    goEditUsernameScreen,
  }
}
