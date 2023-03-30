import { Badge } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { InferArrayItem } from '@/shared/types'

interface Props {
  data: InferArrayItem<IHoleListResponse['items']>['tags']
}

export function Badges(props: Props) {
  return (
    <View className={'w-full flex flex-row gap-2 flex-wrap'}>
      {props.data.map((tag) => (
        <Badge colorScheme="success" rounded={'lg'}>
          {`${tag.body.startsWith('#') ? '' : '#'}${tag.body}`}
        </Badge>
      ))}
    </View>
  )
}
