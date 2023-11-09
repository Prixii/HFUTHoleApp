import { EmojiList } from '@/assets/emoji'
import { Emoji } from '@/components/emoji/Emoji'
import { Text } from 'react-native-paper'
import { StyleProp, TextStyle, View } from 'react-native'
import React, { useMemo } from 'react'
import { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types'

interface Props {
  body: string
  variant?: VariantProp<any>
  secondary?: boolean
  style?: StyleProp<TextStyle>
  numberOfLines?: number
}

/**
 *
 * @description 注意重写了 numberOfLines 逻辑
 */
export function EmojiableText({
  body,
  variant,
  secondary,
  style,
  numberOfLines,
}: Props) {
  const parts = useMemo(() => {
    const reg = /(\[.*?\])/g
    let parts = body.split('\n').map((part) =>
      part
        .split(reg)
        .filter((item) => !!item)
        .map((item) => {
          const emoji = EmojiList.find((emojiItem) => emojiItem.name === item)
          if (emoji) {
            return {
              isEmoji: true,
              asset: emoji.asset,
            }
          } else {
            return {
              isEmoji: false,
              asset: item,
            }
          }
        })
    )
    if (numberOfLines !== undefined) {
      parts = parts.slice(0, numberOfLines)
      parts[parts.length - 1].push({
        isEmoji: false,
        asset: '...',
      })
    }
    return parts
  }, [body, numberOfLines])

  return (
    <View className={'flex flex-row flex-wrap'}>
      {parts.map((part, index) => (
        <View key={index} className="w-full flex flex-row">
          {part.map((item, i) => (
            <>
              {item.isEmoji ? (
                <Emoji asset={item.asset} key={i} size={22} />
              ) : (
                <Text
                  className={`${secondary && 'text-surfaceVariant'}`}
                  variant={variant || 'bodyLarge'}
                  key={item.asset}
                  style={style}
                >
                  {item.asset}
                </Text>
              )}
            </>
          ))}
        </View>
      ))}
    </View>
  )
}
