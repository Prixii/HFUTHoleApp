import { WebView, WebViewProps } from 'react-native-webview'
import React from 'react'

export function StableWebView(props: WebViewProps) {
  return (
    <WebView
      {...props}
      style={{
        opacity: 0.99,
        ...(props.style as object),
      }}
    />
  )
}
