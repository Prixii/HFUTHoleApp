import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Image, Pressable, TouchableNativeFeedback, View } from 'react-native'
import { Func } from '@/shared/types'
import { useTheme } from 'react-native-paper'
import { getImageSize } from '@/shared/utils/imageSize'

export const ImageListItem = React.memo(
  ({
    img,
    i,
    open,
    setIndex,
  }: {
    img: string
    i: number
    length: number
    open: Func
    setIndex: Func
  }) => {
    const theme = useTheme()

    return (
      <Pressable
        onPress={() => {
          setIndex(i)
          open()
        }}
        className={'w-[32%] py-1'}
      >
        <Image
          source={{
            uri: img,
          }}
          className={'rounded-lg w-full h-28'}
          style={{
            resizeMode: 'cover',
            backgroundColor: theme.colors.onBackground,
          }}
        />
      </Pressable>
    )
  }
)
