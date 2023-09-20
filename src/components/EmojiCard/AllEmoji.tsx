/**
 * @author prixii
 * @date 2023-09-19 19
 */

import { EmojiList } from '@/assets/emoji'
import { Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Emoji } from '../emoji/Emoji'

const EMOJI_PER_LINE = 6
const ITEM_HEIGHT = 30

// TODO 自行修改逻辑
const handleEmojiPressed = () => {
  console.log('[emoji pressed]')
}

const Line = (group: number) => {
  const list = EmojiList.slice(
    group * EMOJI_PER_LINE - EMOJI_PER_LINE,
    group * EMOJI_PER_LINE
  )
  return (
    <>
      {list.map((item) => (
        <Pressable onPress={() => handleEmojiPressed()} key={item.name}>
          <Emoji key={item.name} asset={item.asset} size={ITEM_HEIGHT} />
        </Pressable>
      ))}
      <BlankView count={EMOJI_PER_LINE - list.length} />
    </>
  )
}

const BlankView = (props: { count: number }) => {
  return (
    <>
      {Array.from(Array(props.count), (_item, index) => (
        <View style={{ width: ITEM_HEIGHT }} key={index} />
      ))}
    </>
  )
}

const ListTile = (props: { group: number }) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          marginVertical: 8,
        }}
      >
        {Line(props.group)}
      </View>
    </>
  )
}
export const AllEmoji = () => {
  const totalGroupCount = (EmojiList.length + 6) / EMOJI_PER_LINE

  const groupId = []
  for (let group = 0; group < totalGroupCount; group++) {
    groupId.push(group)
  }

  return (
    <>
      <Text style={{ marginTop: 8 }}>所有表情</Text>
      <FlatList
        style={{ height: 5 * ITEM_HEIGHT + 20 }}
        data={groupId}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item: group }) => (
          <ListTile group={group} key={group}></ListTile>
        )}
        initialNumToRender={5}
      />
    </>
  )
}
