import React, { useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import type { FlatListProps } from 'react-native'
import { Func } from '@/shared/types'
import { useDebounceFn } from 'ahooks'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'

type Props<T> = {
  onRefreshing?: Func
  onTopRefresh?: Func
} & FlatListProps<T>

export function RefreshingFlatList<T = any>(props: Props<T>) {
  const [refreshing, setRefreshing] = useState(false)

  const { run: onRefresh } = useDebounceFn(
    async () => {
      console.log('refresh')
      await props.onRefreshing()
      setRefreshing(false)
    },
    { wait: 200 }
  )

  return (
    <FlatList
      refreshing={refreshing}
      onEndReachedThreshold={0.1}
      onEndReached={onRefresh}
      refreshControl={
        props.onTopRefresh && (
          <RefreshIndicatorControl
            refreshing={refreshing}
            onRefresh={props.onTopRefresh}
          />
        )
      }
      {...props}
    />
  )
}
