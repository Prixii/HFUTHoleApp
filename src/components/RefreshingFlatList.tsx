import React, { useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import type { FlatListProps } from 'react-native'
import { Func } from '@/shared/types'
import { useDebounceFn } from 'ahooks'

type Props<T> = {
  onRefreshing?: Func
} & FlatListProps<T>

export function RefreshingFlatList<T = any>(props: Props<T>) {
  const [refreshing, setRefreshing] = useState(false)

  const { run: onRefresh } = useDebounceFn(
    async () => {
      await props.onRefreshing()
      setRefreshing(false)
    },
    { wait: 200 }
  )

  return (
    <FlatList
      refreshing={refreshing}
      onEndReachedThreshold={0.01}
      onEndReached={onRefresh}
      {...props}
    />
  )
}
