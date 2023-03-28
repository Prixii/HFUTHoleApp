import { FAB, useTheme } from 'react-native-paper'
import { useLinkTo } from '@react-navigation/native'

export function HolePostFAB() {
  const theme = useTheme()
  const linkTo = useLinkTo()

  return (
    <FAB
      style={{
        backgroundColor: theme.colors.primary,
      }}
      mode={'elevated'}
      className={'absolute bottom-16 right-5 rounded-full p-1'}
      icon={'plus'}
      color={'white'}
      onPress={() => linkTo('/hole/post')}
    />
  )
}
