import { Chip, Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import React from 'react'
import { AwaitAble } from '@/shared/types'
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon'

interface Props {
  tags: string[]
  onTagClick?: (index: number) => AwaitAble
  icon?: IconSource
}

export function Tags(props: Props) {
  const theme = useTheme()

  return (
    <View className={'flex flex-row flex-wrap gap-2'}>
      {props.tags?.map((tag, index) => (
        <Chip
          icon={props.icon}
          onPress={() => props.onTagClick?.(index)}
          key={tag}
          style={{ backgroundColor: theme.colors.background }}
        >
          <Text
            style={{
              color: theme.colors.primary,
            }}
            className={'text-xs'}
          >
            {`${tag.startsWith('#') ? '' : '#'}${tag}`}
          </Text>
        </Chip>
      ))}
    </View>
  )
}
