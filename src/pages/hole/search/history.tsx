import { useAppDispatch, useAppSelector } from '@/store/store'
import { operateHoleSearchData } from '@/store/reducer/search'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { SearchHistory } from '@/components/search/history'

export const HoleSearchHistory = () => {
  const data = useAppSelector((state) => state.search.hole)
  const dispatch = useAppDispatch()
  const searchRoute = useHoleSearchRoute()

  const deleteAllHistory = () => {
    dispatch(operateHoleSearchData(() => []))
  }

  const deleteHistory = (index: number) => {
    dispatch(operateHoleSearchData((draft) => draft.splice(index, 1)))
  }

  return (
    <SearchHistory
      searchHistroyList={data}
      onDeleteAllHistory={deleteAllHistory}
      onDeleteHistory={deleteHistory}
      onHistoryItemClick={(keyword) => searchRoute.goResult(keyword)}
    />
  )
}
