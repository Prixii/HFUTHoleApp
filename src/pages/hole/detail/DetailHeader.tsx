import { BaseAppBar } from '@/components/BaseAppBar'
import React from 'react'
import { useHoleDetail } from '@/swr/hole'
import { HoleInfoHeader } from '@/pages/hole/components/HoleInfo'
import { View } from 'react-native'
export function HoleDetailHeader() {
  const { data, isSuccess } = useHoleDetail()

  return (
    <>
      <BaseAppBar>
        {isSuccess && (
          <View className={'flex-1'}>
            <HoleInfoHeader data={data!} />
          </View>
        )}
      </BaseAppBar>
    </>
  )
}
