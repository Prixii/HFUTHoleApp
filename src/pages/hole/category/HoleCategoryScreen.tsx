import { useParams } from '@/shared/hooks/useParams'
import { Image, Text, View } from 'react-native'
import { ArticleCategoryEnum } from '@/shared/enums'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useHoleCategoryList } from '@/swr/hole/category'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { HoleCategoryHeader } from '@/pages/hole/category/Header'

export function HoleCategoryScreen() {
  const query = useHoleCategoryList()

  return (
    <LoadingScreen isLoading={query.isLoading} id={1}>
      <View className={'px-2'}>
        <RefreshableHoleList
          {...query}
          ListHeaderComponent={<HoleCategoryHeader />}
        />
      </View>
    </LoadingScreen>
  )
}
