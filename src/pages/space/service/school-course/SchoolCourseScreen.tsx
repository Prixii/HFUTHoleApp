import { useCallback } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import * as Linking from 'expo-linking'
import { EmojiableText } from '@/components/Text/EmojiableText'

const body =
  '好好好好好好好好好好好好好好好好好好好好好好好好好好好[/发呆][/发呆][/发呆]哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈djddnsjjs[/抠鼻][/抠鼻]哦哦哦哦哦'

export const SchoolCourseScreen = () => {
  return (
    <View className="w-full">
      <EmojiableText
        body={body}
        variant={'bodyMedium'}
        style={{ color: 'rgba(0, 0, 0, .75)', lineHeight: 25 }}
      ></EmojiableText>
    </View>
  )
}
