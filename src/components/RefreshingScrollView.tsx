import { ReactNode, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { Func } from '@/shared/types'
import { useDebounceFn } from 'ahooks'

interface Props {
  children: ReactNode
  onRefresh: Func

  className?: string
}

export function RefreshingScrollView(props: Props) {
  const [refreshing, setRefreshing] = useState(false)

  const { run: onRefresh } = useDebounceFn(
    async () => {
      await props.onRefresh()
      setRefreshing(false)
    },
    { wait: 300 }
  )

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className={props.className}
    >
      {props.children}
    </ScrollView>
  )
}
