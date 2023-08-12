import { SearchValidator } from '@/shared/validators/hole/search'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useAppDispatch } from '@/store/store'
import { operateHoleSearchData } from '@/store/reducer/search'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { SearchHeader } from '@/components/search/header'

export function HoleSearchHeader() {
  const dispatch = useAppDispatch()
  const route = useHoleSearchRoute()

  const onSubmit = useDebounce((data: SearchValidator) => {
    dispatch(
      operateHoleSearchData((draft) => {
        draft.unshift(data.keywords)
      })
    )
    route.goResult(data.keywords)
  })

  return (
    <SearchHeader
      onSubmit={onSubmit}
      placeholder="搜索正文内容、#标签、#帖子号"
    />
  )
}
