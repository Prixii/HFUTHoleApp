import { useUserProfile } from '@/swr/user/profile'
import React, { useMemo } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import { TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { Text } from 'react-native-paper'
import Popover from 'react-native-popover-view'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { greetingText } from '@/shared/utils/utils'
import { Button } from '@/components/button'
import { DashBorderSeparator } from '@/components/Separator'
import { Role } from '@/shared/enums'
import { useLinkTo } from '@react-navigation/native'

export const UserPopover = () => {
  const { data, isSuccess } = useUserProfile()
  const linkTo = useLinkTo()

  const { logout } = useAuth()

  const navigateToMyHole = () => {
    linkTo('/user/posted')
  }

  const navigateToLikedHole = () => {
    linkTo('/user/favorite')
  }

  const navigateToReport = () => {}

  const list = useMemo(() => {
    const result = [
      {
        title: '我的树洞',
        onPress: navigateToMyHole,
      },
      {
        title: '我点赞的树洞',
        onPress: navigateToLikedHole,
      },
    ]

    if (data?.role === Role.Admin) {
      result.push({
        title: '举报管理 (管理员)',
        onPress: navigateToReport,
      })
    }

    return result
  }, [data])

  return (
    isSuccess && (
      <View>
        <Popover
          from={
            <TouchableOpacity>
              <UserAvatar url={data.avatar} size={40} />
            </TouchableOpacity>
          }
          backgroundStyle={{
            borderRadius: 25,
          }}
        >
          <View className={'p-3'}>
            <DashBorderSeparator>
              <Text>hi, {data.username},</Text>
              <SecondaryText>{greetingText()}</SecondaryText>
            </DashBorderSeparator>
            <View className={'py-2'}>
              <DashBorderSeparator>
                <View className={'grid space-y-2'}>
                  {list.map((item, index) => (
                    <View>
                      <TouchableNativeFeedback onPress={item.onPress}>
                        <View className={'p-2'}>
                          <Text>{item.title}</Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  ))}
                </View>
              </DashBorderSeparator>
            </View>
            <Button onPress={logout}>退出登录</Button>
          </View>
        </Popover>
      </View>
    )
  )
}
