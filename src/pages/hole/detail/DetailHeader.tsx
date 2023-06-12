import { View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { IdText } from '@/components/Text/Id'
import { TimeText } from '@/components/Text/Time'
import { BaseAppBar } from '@/components/BaseAppBar'
import React from 'react'
import { useHoleDetail } from '@/swr/hole'
import { HoleBottomAction } from '@/pages/hole/components/sheet/HoleBottomAction'

export function HoleDetailHeader() {
  const { data, isSuccess } = useHoleDetail()

  return (
    <>
      <BaseAppBar>
        {isSuccess && (
          <View className={'flex flex-row flex-1 space-x-2 items-center'}>
            <View>
              <UserAvatar url={data.user.avatar} />
            </View>
            <View>
              <IdText id={data.id} />
              <View>
                <TimeText time={data.createAt} />
              </View>
            </View>
          </View>
        )}
        <HoleBottomAction data={data} />
      </BaseAppBar>
    </>
  )
}
