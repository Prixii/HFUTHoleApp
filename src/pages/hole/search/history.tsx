import { Pressable, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { CloseIcon, DeleteIcon } from '@/components/icon'
import { useSearchHistoryStore } from '@/store/hole/search'
import { observer } from 'mobx-react-lite'
import { useImmer } from 'use-immer'
import { useNavigation } from '@react-navigation/native'

export const HoleSearchHistory = observer(() => {
  const store = useSearchHistoryStore()
  const theme = useTheme()
  const navigation = useNavigation()

  const [deleteAble, setDeleteAble] = useImmer<number[]>([])

  const addDeleteAble = (index: number) => {
    setDeleteAble((draft) => {
      draft.push(index)
    })
  }

  const deleteHistory = (index: number) => {
    store.operate((draft) => {
      draft.splice(index, 1)
    })
    setDeleteAble((draft) => {
      draft.splice(index, 1)
    })
  }

  const deleteAllHistory = () => {
    store.operate((draft) => {
      return []
    })
  }

  return (
    <View className={'grid gap-4'}>
      <Text variant={'titleMedium'}>搜索历史</Text>
      <View className={'flex flex-row gap-2 flex-wrap'}>
        {store.data.map((tag, index) => (
          <Pressable
            onLongPress={() => addDeleteAble(index)}
            onPress={() => navigation.navigate('result', { keywords: tag })}
          >
            <View
              key={index}
              className={'relative bg-gray-400/20 py-2 px-4 rounded-[5px]'}
            >
              <Text className={'text-xs'}>{tag}</Text>
              {deleteAble.includes(index) && (
                <Pressable
                  className={'absolute right-[-4]'}
                  onPress={() => deleteHistory(index)}
                >
                  <View
                    className={
                      'w-3 h-3 rounded-full bg-gray-500/40 items-center justify-center'
                    }
                  >
                    <CloseIcon size={8} />
                  </View>
                </Pressable>
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
