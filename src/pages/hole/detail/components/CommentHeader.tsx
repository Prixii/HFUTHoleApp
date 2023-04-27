import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { HoleDetailCommentMode } from '@/shared/enums'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import { useCallback } from 'react'
import { MenuIcon } from '@/components/icon'
import { useHoleDetail } from '@/swr/hole'
import { SecondaryText } from '@/components/Text/SecondaryText'

export function HoleDetailCommentHeader() {
  const theme = useTheme()
  const { data } = useHoleDetail()

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
    <>
      <View className={'bg-white flex flex-row p-3 justify-between'}>
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
            style={{
              color: !isAllMode ? 'black' : theme.colors.surfaceVariant,
            }}
            onPress={() => toggleMode(HoleDetailCommentMode.author)}
          >
            只看洞主
          </Text>
        </View>
        <View className={'flex flex-row space-x-1 items-center'}>
          <MenuIcon size={16} />
          <Text style={{ color: theme.colors.surfaceVariant }}>按热度排序</Text>
        </View>
      </View>
      <View className={'px-3'}>
        <SecondaryText>共有{data.commentCounts}条评论</SecondaryText>
      </View>
    </>
  )
}
