import { WebView } from 'react-native-webview'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

interface Props {
  bvid: string
}

export function BilibiliPlayer(props: Props) {
  return (
    <View className={'w-full h-48 rounded-lg overflow-hidden'}>
      <WebView
        source={{
          uri: `player.bilibili.com/player.html?bvid=${props.bvid}&cid=829156678&page=3&high_quality=1`,
        }}
        style={{ flex: 1 }}
        className={'bg-surface'}
      />
    </View>
  )
}
