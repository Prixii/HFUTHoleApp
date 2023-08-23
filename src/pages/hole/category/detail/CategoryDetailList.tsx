import { useHoleCategoryList } from '@/swr/hole/category'
import { Tabs } from 'react-native-collapsible-tab-view'
import {
  RefreshableHoleList,
  RefreshableHoleListProps,
} from '@/pages/hole/components/HoleList'

type Props = {
  subClassification: string
  enabled: boolean
} & Partial<RefreshableHoleListProps>

export function CategoryDetailList({
  subClassification,
  enabled = false,
  ...props
}: Props) {
  const { category, ...query } = useHoleCategoryList({
    subClassification,
    enabled,
  })

  return <RefreshableHoleList {...query} {...(props as any)} />
}
