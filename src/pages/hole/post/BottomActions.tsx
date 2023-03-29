import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { HoleBodyProps } from '@/pages/hole/post/body'
import React from 'react'
import { HolePostAddTags } from '@/pages/hole/post/tags'

export function BottomActions(props: HoleBodyProps) {
  return (
    <>
      <View className={'flex flex-row justify-between items-center'}>
        <HolePostAddTags control={props.control} />
        <View className={'flex flex-row'}>
          <IconButton
            icon={'camera'}
            className={'bg-[#00AB55]/20'}
            iconColor={'#00AB55'}
          />
          <IconButton icon={'plus'} />
        </View>
      </View>
    </>
  )
}
