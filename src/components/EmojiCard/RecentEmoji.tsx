/**
 * @author prixii
 * @date 2023-09-19 19
 */

import { EmojiList } from '@/assets/emoji'
import { Pressable, Text, View } from 'react-native'
import { Emoji } from '../emoji/Emoji'

const EMOJI_PER_LINE = 7
const ITEM_HEIGHT = 30
export const RecentEmoji = () => {
  const Line = (group: number) => {
    const list = EmojiList.slice(
      group * EMOJI_PER_LINE - EMOJI_PER_LINE,
      group * EMOJI_PER_LINE
    )
    return (
      <>
        {list.map((item) => (
          <Pressable
            onPress={() => console.log('[emoji pressed]')}
            key={item.name}
          >
            <Emoji key={item.name} asset={item.asset} size={ITEM_HEIGHT} />
          </Pressable>
        ))}
      </>
    )
  }

  const ListTile = (props: { group: number }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
      >
        {Line(props.group)}
      </View>
    )
  }

  return (
    <View>
      <Text style={{ marginVertical: 8 }}>最近使用</Text>
      <ListTile group={5} />
    </View>
  )
}
