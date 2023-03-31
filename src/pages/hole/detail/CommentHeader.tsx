import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useState } from 'react'

export enum HoleDetailCommentMode {
  all = 'all',
  author = 'author',
}

export function HoleDetailCommentHeader() {
  const theme = useTheme()

  const [mode, setMode] = useState<HoleDetailCommentMode>(
    HoleDetailCommentMode.all
  )

  const isAllMode = mode === HoleDetailCommentMode.all

  return (
    <View className={'bg-white flex flex-row px-3 py-3'}>
      <View className={'flex flex-row space-x-10'}>
        <Text
          className={isAllMode && 'font-bold'}
          style={{ color: isAllMode ? 'black' : theme.colors.surfaceVariant }}
          onPress={() => setMode(HoleDetailCommentMode.all)}
        >
          全部评论
        </Text>
        <Text
          className={!isAllMode && 'font-bold'}
          style={{ color: !isAllMode ? 'black' : theme.colors.surfaceVariant }}
          onPress={() => setMode(HoleDetailCommentMode.author)}
        >
          只看洞主
        </Text>
      </View>
    </View>
  )
}
