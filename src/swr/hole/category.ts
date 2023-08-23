import { useParams } from '@/shared/hooks/useParams'
import { HoleCategoryNavigationCtx } from '@/shared/hooks/route/useHoleCategoryRoute'
import { useMemo } from 'react'
import { getCategoryByName } from '@/shared/constants/category'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { SWRKeys } from '@/swr/utils'
import { GetHoleListRequest } from '@/request/apis/hole'
import { HoleListMode } from '@/shared/enums'

interface Options {
  subClassification?: string
  enabled: boolean
}

export function useHoleCategoryList(options?: Options) {
  const { name, subName } = useParams<HoleCategoryNavigationCtx>()
  const category = useMemo(() => getCategoryByName(name), [name])!

  const queryKey = [
    SWRKeys.hole.getCategoryHoleList,
    name,
    category,
    options?.subClassification,
  ]

  const query = useBaseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      GetHoleListRequest({
        classification: category.name,
        subClassification: options?.subClassification || subName,
        limit: 10,
        page: pageParam,
        mode: HoleListMode.latest,
      }),
    enabled: !!options?.enabled,
  })

  return {
    ...query,
    category,
    name,
    subName,
  }
}
