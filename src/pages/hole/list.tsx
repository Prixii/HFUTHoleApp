import { useHoleList } from '@/swr/hole'
import { View } from 'react-native'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { SkeletonLoading } from '@/components/Skeleton'
import { useNavigation } from '@react-navigation/native'
import { HoleHeader } from '@/pages/hole/header'
import { LoadMore } from '@/components/LoadMore'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

export function HoleList() {
  const navigation = useNavigation()

  const query = useHoleList()

  return <RefreshableHoleList {...query} />
}
