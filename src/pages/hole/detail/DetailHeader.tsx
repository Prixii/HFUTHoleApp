import { Text } from 'react-native-paper'
import { View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { IdText } from '@/components/Text/Id'
import { TimeText } from '@/components/Text/Time'
import { LikeHole } from '@/pages/hole/detail/LikeHole'
import { BaseAppBar } from '@/components/BaseAppBar'
import React from 'react'
import { useHoleDetail } from '@/swr/hole'
import { ReportAction } from '@/pages/hole/detail/ReportAction'
import { ReportType } from '@/shared/validators/report'

export function HoleDetailHeader() {
  const { data, isSuccess } = useHoleDetail()

  return (
    <BaseAppBar>
      {isSuccess && (
        <>
          <View className={'flex flex-row flex-1'}>
            <View className={'flex flex-row space-x-2'}>
              <UserAvatar url={data.user.avatar} />
              <View className={'grid space-y-2 w-2/3'}>
                <View className={'flex flex-row space-x-2 items-center'}>
                  <IdText id={data.id} />
                  <View>
                    <TimeText time={data.createAt} />
                  </View>
                </View>
                <Text
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
                  className={'text-black/60'}
                >
                  {data.body}
                </Text>
              </View>
            </View>
          </View>
          <View className={'flex flex-row space-x-2 items-center px-2'}>
            <LikeHole />
            <View>
              <ReportAction type={ReportType.hole} holeId={data.id} />
            </View>
          </View>
        </>
      )}
    </BaseAppBar>
  )
}
