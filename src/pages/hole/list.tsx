import { useHoleList } from '@/swr/hole'
import { View } from 'react-native'
import React from 'react'

export const HoleItem = () => {
  const { data } = useHoleList()

  return <View></View>
}

export function HoleList() {
  const { data } = useHoleList()
  return <View></View>
}
