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
import { ReactNode } from 'react'

interface Props {
  title: string

  secondary: string

  snackbar: string

  children: ReactNode
}

export function AuthView(props: Props) {
  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      className={'flex-1'}
      keyboardVerticalOffset={0}
    >
      <View className={'flex-1 justify-around'}>
        <StatusBar backgroundColor={'#fff'} />
        <SafeAreaView
          className={'bg-white min-h-screen w-screen py-[10px] px-5'}
        >
          <View className={'grid gap-5'}>
            <Avatar.Image
              source={require('../../../assets/splash.jpg')}
              size={100}
            />
            <View className={'grid space-y-2'}>
              <Text className={'font-bold text-2xl'}>{props.title}</Text>
              <Text className={'text-gray-400'}>{props.secondary}</Text>
            </View>
            <View>
              <Snackbar text={props.snackbar} icon={'info'} />
              <View className={'mt-2'}>{props.children}</View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  )
}
