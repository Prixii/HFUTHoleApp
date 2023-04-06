import { useNavigation } from '@react-navigation/native'
import { useHolePostContext } from '@/shared/context/hole'
import { useMutation } from 'react-query'
import { PostHoleValidator } from '@/shared/validators/hole'
import { PostHoleRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { Button } from '@/components/button'
import { Func } from '@/shared/types'
import { ReactNode } from 'react'

interface Props {
  onPress: Func
  loading: boolean
  submitText: string
  children?: ReactNode
}

export function BackAndButtonHeader(props: Props) {
  const navigation = useNavigation()

  return (
    <View className={'flex flex-row justify-between items-center'}>
      <IconButton
        icon={'close'}
        className={'bg-transparent'}
        onPress={() => navigation.goBack()}
      />
      <View>{props.children}</View>
      <View>
        <Button
          mode="contained"
          onPress={props.onPress}
          loading={props.loading}
        >
          {props.submitText}
        </Button>
      </View>
    </View>
  )
}
