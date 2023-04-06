import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { HoleDetailCommentMode } from '@/shared/enums'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import { useCallback } from 'react'

export function HoleDetailCommentHeader() {
  const theme = useTheme()

  const { mode, setMode } = useHoleDetailCommentContext()

  const isAllMode = mode === HoleDetailCommentMode.all

  const toggleMode = useCallback(
    (param: HoleDetailCommentMode) => {
      if (param === mode) {
        return
      }
      setMode(param)
    },
    [mode]
  )

  return (
    <View className={'bg-white flex flex-row px-3 py-3'}>
      <View className={'flex flex-row space-x-10'}>
        <Text
          className={isAllMode && 'font-bold'}
          style={{ color: isAllMode ? 'black' : theme.colors.surfaceVariant }}
          onPress={() => toggleMode(HoleDetailCommentMode.all)}
        >
          全部评论
        </Text>
        <Text
          className={!isAllMode && 'font-bold'}
          style={{ color: !isAllMode ? 'black' : theme.colors.surfaceVariant }}
          onPress={() => toggleMode(HoleDetailCommentMode.author)}
        >
          只看洞主
        </Text>
      </View>
    </View>
  )
}
