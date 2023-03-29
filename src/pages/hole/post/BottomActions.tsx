import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import React from 'react'
import { HolePostAddTags } from '@/pages/hole/post/tags'

export function BottomActions() {
  return (
    <>
      <View className={'flex flex-row justify-between items-center'}>
        <HolePostAddTags />
        <View className={'flex flex-row'}>
          <IconButton
            icon={'camera'}
            className={'bg-[#00AB55]/20'}
            iconColor={'#00AB55'}
          />
          {/*<IconButton icon={'plus'} />*/}
        </View>
      </View>
    </>
  )
}
