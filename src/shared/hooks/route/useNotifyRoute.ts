import { useLinkTo, useNavigation } from '@react-navigation/native'

export function useNotifyRoute() {
  const navigation = useNavigation()
  const linkTo = useLinkTo()

  const goToInteraction = () => {
    linkTo('/notify-nested/interaction')
  }

  const goToSystem = () => {
    linkTo('/notify-nested/system')
  }

  return {
    goToInteraction,
    goToSystem,
  }
}
