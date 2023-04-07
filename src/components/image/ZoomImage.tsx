import ImageViewer from 'react-native-image-zoom-viewer'
import React from 'react'

export function ZoomImage(props: React.ComponentProps<typeof ImageViewer>) {
  return (
    <ImageViewer
      enableSwipeDown={true}
      style={{
        flex: 1,
        width: '100%',
      }}
      enablePreload={true}
      {...props}
    />
  )
}
