import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Image, Pressable, TouchableNativeFeedback, View } from 'react-native'
import { Func } from '@/shared/types'
import { useTheme } from 'react-native-paper'
import { ImageSkeleton, SkeletonLoading } from '@/components/Skeleton'
import { getImageSize } from '@/shared/utils/imageSize'
import { Skeleton } from 'native-base'

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
      if (Number.isNaN(percent)) {
        return
      }

      let width = ''
      let height = 'h-56'

      if (length !== 2) {
        if (percent < 1) {
          width = 'w-1/2'
          if (percent > 0.75) {
            height = 'h-72'
          } else {
            height = 'h-52'
          }
        } else {
          width = 'w-full'
          height = 'h-56'
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
          className={`rounded-lg ${length > 2 ? 'h-40' : 'h-56'}`}
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
