import { useHoleDetail, useHoleList } from '@/swr/hole'
import { useParams } from '@/shared/hooks/useParams'
import { isNullOrUndefined } from '@/shared/utils/utils'

export function useVoteItem() {
  const params = useParams<{ id?: number }>()

  const { setData: setListData } = useHoleList()

  if (isNullOrUndefined(params?.id)) {
    return {
      setData: setListData,
    }
  }

  const { setData: setDetailData } = useHoleDetail()

  return {
    setData: setDetailData,
  }
}
