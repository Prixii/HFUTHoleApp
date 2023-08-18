import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import { Avatar } from 'react-native-paper'
import { Snackbar } from '@/components/snackbar/snackbar'
import { ReactNode, useMemo } from 'react'
import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'

interface Props {
  title: string

  secondary: string

  snackbar: string | string[]

  children: ReactNode

  logo?: ReactNode

  image?: string
}

export function AuthView(props: Props) {
  const snackbarContent = useMemo(
    () => (Array.isArray(props.snackbar) ? props.snackbar : [props.snackbar]),
    [props.snackbar]
  )

  const keyboardHeight = useKeyboardHeight()

  return (
    <>
      <StatusBar backgroundColor={'#fff'} />
      <View
        className={'flex-1 relative'}
        style={{
          bottom: Math.max(keyboardHeight - 100, 0),
        }}
      >
        <View className={'flex-1 justify-around'}>
          <SafeAreaView className={'bg-white flex-1 w-screen py-[10px] px-5'}>
            <View className={'grid gap-5'}>
              {props.logo || (
                <Avatar.Image
                  source={props.image || require('../../../assets/splash.png')}
                  size={100}
                />
              )}
              <View className={'grid space-y-2'}>
                <Text className={'font-bold text-2xl'}>{props.title}</Text>
                <Text className={'text-gray-400'}>{props.secondary}</Text>
              </View>
              <View className={'space-y-2'}>
                {snackbarContent.map((content) => (
                  <View key={content}>
                    <Snackbar text={content} icon={'info'} />
                  </View>
                ))}
                <View className={'mt-2'}>{props.children}</View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </>
  )
}
