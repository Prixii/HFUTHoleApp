import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { Button } from '@/components/button'
import { Func } from '@/shared/types'
import { ReactNode } from 'react'
import { ButtonProps } from 'react-native-paper'

interface Props {
  onPress: Func
  loading: boolean
  submitText: string
  children?: ReactNode
  buttonMode?: ButtonProps['mode']
}

export function BackAndButtonHeader(props: Props) {
  const navigation = useNavigation()

  return (
    <View className={'flex flex-row justify-between items-center space-x-2'}>
      <View className={'flex-1'}>
        <IconButton
          icon={'close'}
          transparent={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      {props.children}
      <View>
        <Button
          mode={props.buttonMode || 'contained'}
          onPress={props.onPress}
          loading={props.loading}
        >
          {props.submitText}
        </Button>
      </View>
    </View>
  )
}
