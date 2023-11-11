import { WebView } from 'react-native-webview'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useCallback } from 'react'
import * as Linking from 'expo-linking'

interface Props {
  bvid: string | undefined
}

export const BilibiliPlayer = React.memo(({ bvid }: Props) => {
  const openBilibili = useCallback(
    () => Linking.openURL(`bilibili://video/${bvid}`),
    [bvid]
  )
  return (
    <View>
      <View className={'w-full h-48 rounded-lg overflow-hidden'}>
        <WebView
          source={{
            uri: `https://player.bilibili.com/player.html?bvid=${bvid}&cid=829156678&page=3&high_quality=1`,
          }}
          className={'bg-surface'}
          style={{
            opacity: 0.99,
          }}
        />
      </View>
      <Button
        onPress={openBilibili}
        textColor="#fff"
        className="mt-2 bg-[#fb7299] rounded-full"
      >
        打开哔哩哔哩
      </Button>
    </View>
  )
})
