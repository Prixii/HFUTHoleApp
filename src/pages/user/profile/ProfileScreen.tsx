import { Image, useWindowDimensions, View, StatusBar } from 'react-native'
import { Text } from 'react-native-paper'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserFavoriteHoleList, useUserPostedHoleList } from '@/swr/user/hole'
import { useUserProfile } from '@/swr/user/profile'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { ProgressBar } from '@/components/ProgressBar'
import { MyAvatar } from '@/components/UserAvatar'
import { Tabs, type Tab } from '@/pages/user/profile/Tabs'
import { useMemo } from 'react'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

const UserHoleList = () => {
  const query = useUserPostedHoleList()
  return (
    <View style={{ flex: 1 }}>
      <RefreshableHoleList {...query} />
    </View>
  )
}

const UserFavoriteHoleList = () => {
  const query = useUserFavoriteHoleList()
  return (
    <View style={{ flex: 1 }}>
      <RefreshableHoleList {...query} />
    </View>
  )
}

const tabs: Tab[] = [
  {
    key: 'user-hole',
    title: '我的树洞',
    component: UserHoleList,
  },
  {
    key: 'user-favorite-hole',
    title: '我的树洞',
    component: UserFavoriteHoleList,
  },
]

export function ProfileScreen() {
  const { isLoading } = useUserPostedHoleList()
  const { data: userData } = useUserProfile()
  const { width } = useWindowDimensions()

  const { imageWidth, imageHeight } = useMemo(
    () => ({
      imageWidth: width,
      imageHeight: (width / 16) * 8,
    }),
    [width]
  )

  return (
    <LoadingScreen isLoading={isLoading}>
      <StatusBar backgroundColor="transparent" translucent />

      <View className="flex-1 w-full">
        <View className="relative">
          <View
            className="absolue z-10 bg-black/20"
            style={{ width: imageWidth, height: imageHeight }}
          />
          <Image
            className="absolute"
            resizeMode="cover"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
            source={require('@/assets/img/deno-read-news.png')}
          />
        </View>

        <View className="relative w-full py-12 px-6 bg-white">
          <View className="absolute -top-8 left-8">
            <MyAvatar size={64} />
          </View>
          <View className="flex flex-row justify-between">
            <View className="flex-1">
              <Text className="text-lg">{userData.username}</Text>
              <View className="flex flex-row">
                <SecondaryText style={{ marginRight: 8 }} variant={'bodySmall'}>
                  LV.3
                </SecondaryText>
                <SecondaryText variant={'bodySmall'}>318/500</SecondaryText>
              </View>
              <ProgressBar />
            </View>
            <View className="w-24" />
          </View>
        </View>

        <Tabs tabs={tabs} />
      </View>
    </LoadingScreen>
  )
}
