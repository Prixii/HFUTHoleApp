import { Pressable, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { DeleteIcon } from '@/components/icon'
import { useImmer } from 'use-immer'
import { Closeable } from '@/components/Closeable'

interface SearchHistoryProps {
  searchHistroyList?: string[]
  onHistoryItemClick?: (text: string) => void
  onDeleteAllHistory?: () => void
  /**
   *
   * @description 参数为删除项的下标
   */
  onDeleteHistory?: (index: number) => void
}

export const SearchHistory = ({
  searchHistroyList,
  onHistoryItemClick,
  onDeleteAllHistory,
  onDeleteHistory,
}: SearchHistoryProps) => {
  const theme = useTheme()
  const [deleteAble, setDeleteAble] = useImmer<number[]>([])

  const addDeleteAble = (index: number) => {
    setDeleteAble((draft) => {
      draft.push(index)
    })
  }

  const deleteHistory = (index: number) => {
    onDeleteHistory?.(index)
    setDeleteAble((draft) => {
      draft.splice(index, 1)
    })
  }

  return (
    <View className={'grid gap-4'}>
      <Text variant={'titleMedium'}>搜索历史</Text>
      <View className={'flex flex-row gap-2 flex-wrap'}>
        {searchHistroyList?.map((tag, index) => (
          <Pressable
            key={index}
            onLongPress={() => addDeleteAble(index)}
            onPress={() => onHistoryItemClick?.(tag)}
          >
            <View
              key={index}
              className={'relative bg-gray-400/20 py-2 px-4 rounded-[5px]'}
            >
              <Text className={'text-xs'}>{tag}</Text>
              {deleteAble.includes(index) && (
                <Closeable onPress={() => deleteHistory(index)} />
              )}
            </View>
          </Pressable>
        ))}
      </View>
      <View
        className={'w-screen justify-center flex-row items-center text-center'}
      >
        <View>
          <DeleteIcon color={theme.colors.surfaceVariant} size={16} />
        </View>
        <SecondaryText onPress={onDeleteAllHistory}>清空搜索历史</SecondaryText>
      </View>
    </View>
  )
}
