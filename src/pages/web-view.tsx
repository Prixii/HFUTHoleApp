import WebView from 'react-native-webview'
import { useParams } from '@/shared/hooks/useParams'

interface RouteParams {
  uri: string
}

export function WebViewPage() {
  const params = useParams<RouteParams>()

  return (
    <WebView className={'w-screen h-screen'} source={{ uri: params.uri }} />
  )
}
