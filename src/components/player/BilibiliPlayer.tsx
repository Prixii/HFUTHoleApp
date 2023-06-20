import { WebView } from 'react-native-webview'
import { View } from 'react-native'

interface Props {
  bvid: string
}

export function BilibiliPlayer(props: Props) {
  return (
    <View className={'w-full h-48'}>
      <WebView
        source={{
          uri: `player.bilibili.com/player.html?bvid=${props.bvid}A&cid=829156678&page=3&high_quality=1&autoplay=false`,
        }}
        style={{ flex: 1 }}
      />
    </View>
  )
}
