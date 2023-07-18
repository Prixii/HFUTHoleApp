import { View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useHoleCategoryList } from '@/swr/hole/category'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { HoleCategoryHeader } from '@/pages/hole/category/Header'
import { useRoute } from '@react-navigation/native'

export function HoleCategoryScreen() {
  const query = useHoleCategoryList()

  return (
    <LoadingScreen isLoading={query.isLoading} id={1}>
      <View className={'px-2'}>
        <RefreshableHoleList
          {...query}
          ListHeaderComponent={HoleCategoryHeader}
        />
      </View>
    </LoadingScreen>
  )
}
