import { useMutation } from 'react-query'
import {
  readAllNotificationRequest,
  ReadNotificationType,
} from '@/request/apis/notify'
import { useMount } from 'ahooks'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'

export function useReadNotifications(type: ReadNotificationType) {
  const mutation = useMutation({
    mutationFn: () => readAllNotificationRequest(type),
  })
  const query = useBaseNotificationsQuery()

  useMount(() => {
    mutation.mutate()
    query.invalidateData()
  })
}

export function useNavigateToNotificationTarget(
  data: INotifySystemListItem | INotifyInteractionListItem
) {
  const { go } = useHoleDetailRoute()

  const onNotificationPress = () => {
    if (!data.hole) {
      return
    }

    go(data!.hole!.id, {
      commentId: data!.comment?.id,
    })
  }

  return {
    onNotificationPress,
  }
}
