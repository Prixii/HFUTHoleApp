import { Pressable, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { DeleteIcon } from '@/components/icon'
import { observer } from 'mobx-react-lite'
import { useImmer } from 'use-immer'
import { useSearchNavigation } from '@/shared/hooks/useSearchNavigation'
import { Closeable } from '@/components/Closeable'
import { store, useAppDispatch, useAppSelector } from '@/store/store'
import { operateSearchData } from '@/store/reducer/search'

export const HoleSearchHistory = observer(() => {
  const theme = useTheme()
  const { searchWithKeywords } = useSearchNavigation()

  const [deleteAble, setDeleteAble] = useImmer<number[]>([])

  const data = useAppSelector((state) => state.search.data) as string[]
  const dispatch = useAppDispatch()

  const addDeleteAble = (index: number) => {
    setDeleteAble((draft) => {
      draft.push(index)
    })
  }

  const deleteHistory = (index: number) => {
    dispatch(
      operateSearchData((draft) => {
        draft.splice(index, 1)
      })
    )
    setDeleteAble((draft) => {
      draft.splice(index, 1)
    })
  }

  const deleteAllHistory = () => {
    dispatch(
      operateSearchData(() => {
        return []
      })
    )
  }

  return (
    <View className={'grid gap-4'}>
      <Text variant={'titleMedium'}>搜索历史</Text>
      <View className={'flex flex-row gap-2 flex-wrap'}>
        {data.map((tag, index) => (
          <Pressable
            key={index}
            onLongPress={() => addDeleteAble(index)}
            onPress={() => searchWithKeywords(tag)}
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
        <SecondaryText onPress={deleteAllHistory}>清空搜索历史</SecondaryText>
      </View>
    </View>
  )
})
