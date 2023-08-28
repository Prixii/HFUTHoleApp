import { BaseAppBar } from '@/components/BaseAppBar'
import React from 'react'
import { useHoleDetail } from '@/swr/hole'
import { HoleInfoHeader } from '@/pages/hole/components/HoleInfo'
import { View } from 'react-native'
import { useParams } from '@/shared/hooks/useParams'
import { HoleReplyListRouteParams } from '@/shared/types/interface/ReplyListRouteParams.interface'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { Button } from 'react-native-paper'

export function HoleDetailHeader() {
  const { data, isSuccess } = useHoleDetail()
  const params = useParams<HoleReplyListRouteParams>()
  const holeRoute = useHoleDetailRoute()

  return (
    <>
      <BaseAppBar>
        {isSuccess && (
          <View className={'flex-1'}>
            <View className={'flex-row space-x-2 items-center'}>
              <View className={'flex-1'}>
                <HoleInfoHeader data={data!} />
              </View>
              {params.isMessageFrom && (
                <Button onPress={() => holeRoute.go(params.holeId!)}>
                  帖子详情
                </Button>
              )}
            </View>
          </View>
        )}
      </BaseAppBar>
    </>
  )
}
