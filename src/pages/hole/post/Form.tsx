import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'

import { getQAQFont, WindowHeight } from '@/shared/utils/utils'
import { NativeInput } from '@/components/form/NativeInput'
import { View } from 'react-native'
import { FormImage } from '@/components/form/FormImage'
import { useHolePostContext } from '@/shared/context/hole'
import { useTheme } from 'react-native-paper'
import React, { useCallback, useMemo } from 'react'
import { useFocusEffect } from '@react-navigation/native'

interface Props {
  bottomHeight: number
  headerHeight: number
}

export function HolePostForm({ bottomHeight, headerHeight }: Props) {
  const theme = useTheme()

  const {
    imgs,
    setImgs,
    form: { control },
  } = useHolePostContext()

  const keyboardHeight = useKeyboardHeight()

  const inputHeight = useMemo(
    () => WindowHeight - keyboardHeight - headerHeight - bottomHeight,
    [bottomHeight, headerHeight, keyboardHeight]
  )

  return (
    <View
      style={{
        height: inputHeight,
      }}
      className={'flex space-y-2 py-2'}
    >
      <View className={'border-b-[1px] border-b-black/5'}>
        <NativeInput
          name={'title'}
          control={control}
          style={{ backgroundColor: theme.colors.background }}
          placeholder={`写个响亮的标题吧(没有标题也可以发布哦)~${getQAQFont(
            'happy'
          )}`}
        />
      </View>
      <View className={'flex-1'}>
        <NativeInput
          name={'body'}
          control={control}
          multiline={true}
          style={{ backgroundColor: theme.colors.background, flex: 1 }}
          placeholder={'说点什么吧...'}
        />
      </View>
      <View>
        <FormImage
          imgs={imgs}
          onCloseable={(index) =>
            setImgs((draft) => {
              draft!.splice(index, 1)
            })
          }
        />
      </View>
    </View>
  )
}
