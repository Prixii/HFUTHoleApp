import {
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { WebView } from 'react-native-webview'
import { getJavascriptSource, toString } from './utils'
import type { ApexChartsProps, Message, ApexChartsInstance } from './types'

export const ApexCharts = forwardRef(
  (
    {
      options,
      injectedCSS = '',
      backgroundColor = 'rgba(0, 0, 0, 0)',
    }: ApexChartsProps,
    ref
  ) => {
    const webviewRef = useRef<WebView>()

    const html = useMemo(
      () => `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
            <style>
              html,
              body {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
              }
              ${injectedCSS}
            </style>
          </head>
          <body>
            <div id="chart"></div>
          </body>
        </html>
      `,
      [backgroundColor, injectedCSS]
    )

    const onLoadEnd = useCallback(() => {
      webviewRef.current?.injectJavaScript(getJavascriptSource(options))
    }, [options])

    const postMessage = useCallback((message: Message) => {
      webviewRef.current?.postMessage(toString(message))
    }, [])

    const updateSeries = useCallback<ApexChartsInstance['updateSeries']>(
      (newSeries, animate = true) => {
        postMessage({
          type: 'updateSeries',
          data: {
            newSeries,
            animate,
          },
        })
      },
      [postMessage]
    )

    const updateOptions = useCallback<ApexChartsInstance['updateOptions']>(
      (newOptions, redrawPaths = false) => {
        postMessage({
          type: 'updateOptions',
          data: {
            newOptions,
            redrawPaths,
          },
        })
      },
      [postMessage]
    )

    useImperativeHandle(
      ref,
      () => ({
        updateSeries,
        updateOptions,
      }),
      [updateOptions, updateSeries]
    )

    return (
      <WebView
        ref={webviewRef}
        style={{
          opacity: 0.99,
        }}
        source={{
          html,
          baseUrl: '',
        }}
        onLoadEnd={onLoadEnd}
        originWhitelist={['*']}
        scrollEnabled={false}
        allowFileAccess
        allowUniversalAccessFromFileURLs
        mixedContentMode="always"
      />
    )
  }
)
