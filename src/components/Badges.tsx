import { Badge } from 'native-base'
import React from 'react'
import { Pressable, View } from 'react-native'
import { AwaitAble, InferArrayItem } from '@/shared/types'

interface Props {
  data: InferArrayItem<IHoleListResponse['items']>['tags']
  onPress?: (tag: string) => AwaitAble
}

export function Badges(props: Props) {
  return (
    <View className={'w-full flex flex-row gap-2 flex-wrap'}>
      {props.data.map((tag) => (
        <Pressable onPress={() => props.onPress(tag.body)} key={tag.id}>
          <Badge colorScheme="success" rounded={'lg'}>
            {`${tag.body.startsWith('#') ? '' : '#'}${tag.body}`}
          </Badge>
        </Pressable>
      ))}
    </View>
  )
}
