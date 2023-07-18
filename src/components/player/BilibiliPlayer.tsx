import { WebView } from 'react-native-webview'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import React from 'react'

interface Props {
  bvid: string | undefined
}

export const BilibiliPlayer = React.memo((props: Props) => {
  return (
    <View className={'w-full h-48 rounded-lg overflow-hidden'}>
      <WebView
        source={{
          uri: `https://player.bilibili.com/player.html?bvid=${props.bvid}&cid=829156678&page=3&high_quality=1`,
        }}
        className={'bg-surface'}
        style={{
          opacity: 0.99,
        }}
      />
    </View>
  )
})
