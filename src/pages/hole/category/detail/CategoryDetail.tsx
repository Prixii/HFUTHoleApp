import { useHoleCategoryList } from '@/swr/hole/category'
import { LoadingScreen } from '@/components/LoadingScreen'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { CategoryDetailHeader } from '@/pages/hole/category/detail/CategoryDetailHeader'
import { ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'
import { useMemo } from 'react'

export function CategoryDetailScreen() {
  const { category, ...query } = useHoleCategoryList()

  const tabs = useMemo<ITabViewTabs[]>(
    () => [
      {
        key: 'latest',
        title: '最新',
        component: () => <RefreshableHoleList {...query} />,
      },
      ...category.children.map((item) => ({
        key: item,
        title: item,
        component: () => <RefreshableHoleList {...query} />,
      })),
    ],
    [category.children, query]
  )

  return (
    <LoadingScreen isLoading={query.isLoading}>
      <CategoryDetailHeader />
      <TabView tabs={tabs} renderTabBar={TabViewBar} />
    </LoadingScreen>
  )
}
