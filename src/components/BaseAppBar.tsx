import { Appbar } from 'react-native-paper'
import { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native'

interface Props {
  children?: ReactNode
}

export function BaseAppBar(props: Props) {
  const navigation = useNavigation()

  return (
    <Appbar.Header className={'w-full overflow-hidden'}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      {props.children}
    </Appbar.Header>
  )
}
