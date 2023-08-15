import { View } from 'react-native'
import { useHelp } from '@/swr/space/chore'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'
import { Text } from 'react-native-paper'
import { ScreenWrapper } from '@/components/ScrollWrapper'
import { LoadingScreen } from '@/components/LoadingScreen'

/**
 *
 * @description 页面的 params 为 HelpType 数组
 */
export const ScoreHelpScreen = () => {
  const { data, isLoading, isFetching, isError, refetch } = useHelp()

  return (
    <LoadingScreen
      isLoading={isLoading}
      isError={isError}
      displayOriginalPageOnError={true}
    >
      <ScreenWrapper
        refreshControl={
          <RefreshIndicatorControl
            refreshing={isFetching}
            onRefresh={refetch}
          />
        }
      >
        <View className="w-full flex space-y-8 py-8">
          {data?.map((item) => (
            <View
              key={item.title}
              className="w-[90%] mx-auto bg-white p-4 rounded-lg"
            >
              <Text variant="headlineSmall">{item.title}</Text>
              {item.message.map((card) => (
                <View key={card.question}>
                  <Text variant="titleSmall" className="my-3">
                    {card.question}
                  </Text>
                  <Text className="leading-5">{card.answer}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScreenWrapper>
    </LoadingScreen>
  )
}
