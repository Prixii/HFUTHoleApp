import { Appbar } from 'react-native-paper'
import { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native'

interface Props {
  children?: ReactNode

  className?: string
}

export function BaseAppBar(props: Props) {
  const navigation = useNavigation()

  return (
    <Appbar
      className={
        'w-screen overflow-hidden bg-white flex flex-row space-between h-20 border-b-[1px] border-black/5'
      }
    >
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      {props.children}
    </Appbar>
  )
}
