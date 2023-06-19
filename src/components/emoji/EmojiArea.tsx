import { FlatList, Pressable, ScrollView, View } from 'react-native'
import { EmojiItem, EmojiList } from '@/assets/emoji'
import { Emoji } from '@/components/emoji/Emoji'
import { AwaitAble } from '@/shared/types'
import { useTheme } from 'react-native-paper'
import { Hidden } from '@/components/Hidden'

interface Props {
  onEmojiSelect: (emoji: EmojiItem) => AwaitAble<void>
  expandArea?: boolean
}

export function EmojiArea(props: Props) {
  const theme = useTheme()

  return (
    <>
      {props.expandArea ? (
        <ScrollView
          className={'h-56 py-2'}
          style={{ backgroundColor: theme.colors.background }}
        >
          <View className={'flex-row space-y-4 items-center flex-wrap'}>
            {EmojiList.map((emoji) => {
              return (
                <Pressable onPress={() => props.onEmojiSelect(emoji)}>
                  <View className={'flex mx-3 justify-center items-center'}>
                    <Emoji asset={emoji.asset} />
                  </View>
                </Pressable>
              )
            })}
          </View>
        </ScrollView>
      ) : (
        <View className={'py-2'}>
          <FlatList
            data={EmojiList}
            renderItem={({ item: emoji }) => (
              <Pressable onPress={() => props.onEmojiSelect(emoji)}>
                <View className={'flex justify-center items-center mx-3'}>
                  <Emoji asset={emoji.asset} size={28} />
                </View>
              </Pressable>
            )}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'nowrap' }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </>
  )
}
