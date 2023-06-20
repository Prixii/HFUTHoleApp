import { EmojiList } from '@/assets/emoji'
import { Emoji } from '@/components/emoji/Emoji'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import { PrimaryText } from '@/components/Text/PrimaryText'
import React from 'react'

interface Props {
  body: string
}

export function EmojiableText({ body }: Props) {
  const renderBody = () => {
    const reg = /(\[.*?\])/g
    const parts = body.split(reg)

    if (parts.length === 1 && !reg.test(body)) {
      return <Text variant={'bodyLarge'}>{body}</Text>
    }

    return parts.map((part, index) => {
      const emoji = EmojiList.find((item) => item.name === part)

      if (emoji) {
        return <Emoji asset={emoji.asset} key={index} size={22} />
      } else {
        return (
          <Text variant={'bodyLarge'} key={index}>
            {part}
          </Text>
        )
      }
    })
  }

  return (
    <>
      <View className={'flex flex-row flex-wrap'}>{renderBody()}</View>
    </>
  )
}
