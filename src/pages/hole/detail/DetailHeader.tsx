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
            <View className={'flex-row space-x-2 items-center'}>
              <View className={'flex-1'}>
                <HoleInfoHeader data={data!} />
              </View>
            </View>
          </View>
        )}
      </BaseAppBar>
    </>
  )
}
