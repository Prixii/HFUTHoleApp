import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Image, Pressable, TouchableNativeFeedback, View } from 'react-native'
import { Func } from '@/shared/types'
import { useTheme } from 'react-native-paper'
import { getImageSize } from '@/shared/utils/imageSize'

export const ImageListItem = React.memo(
  ({
    img,
    i,
    length,
    index,
    open,
    setIndex,
  }: {
    img: string
    i: number
    length: number
    open: Func
    index: number
    setIndex: Func
  }) => {
    const theme = useTheme()
    const [size, setSize] = useState({ width: 0, height: 1 })
    const [loading, setLoading] = useState(true)
    const percent = useMemo(() => size.width / size.height, [size])

    useEffect(() => {
      getImageSize(img).then((size) => {
        setLoading(false)
        setSize(size)
      })
    }, [img])

    const getSize = () => {
      let width = 'w-full'
      let height = 'h-56'

      if (length !== 2) {
        if (percent < 1 && percent !== 0) {
          width = 'w-1/2'
        } else {
          width = 'w-full'
        }
      }

      return `${width} ${height}`
    }

    return (
      <Pressable
        onPress={() => {
          setIndex(i)
          open()
        }}
        className={'h-full flex-1 px-1'}
      >
        <Image
          source={{
            uri: img,
          }}
          className={`rounded-lg ${getSize()}`}
          style={{
            resizeMode: 'cover',
            backgroundColor: theme.colors.onBackground,
          }}
          key={index}
        />
      </Pressable>
    )
  }
)
