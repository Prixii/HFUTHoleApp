import { Badge } from 'native-base'
import React from 'react'
import { Pressable, View } from 'react-native'
import { AwaitAble, InferArrayItem } from '@/shared/types'

interface Props {
  data: InferArrayItem<IHoleListResponse['items']>['tags'] | string[]
  onPress?: (tag: string) => AwaitAble
}

export function Badges(props: Props) {
  return (
    <View className={'w-full flex flex-row gap-2 flex-wrap'}>
      {props.data.map((tag) => {
        const body = tag?.body || tag

        return (
          <Pressable onPress={() => props?.onPress?.(body)} key={body}>
            <Badge colorScheme="success" rounded={'lg'}>
              {`${body.startsWith('#') ? '' : '#'}${body}`}
            </Badge>
          </Pressable>
        )
      })}
    </View>
  )
}
