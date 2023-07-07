import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'

import { WindowHeight } from '@/shared/utils/utils'
import { NativeInput } from '@/components/form/NativeInput'
import { View } from 'react-native'
import { FormImage } from '@/components/form/FormImage'
import { useHolePostContext } from '@/shared/context/hole'
import { useTheme } from 'react-native-paper'
import React, { useMemo } from 'react'

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
      <NativeInput
        name={'body'}
        control={control}
        multiline={true}
        style={{ backgroundColor: theme.colors.background, flex: 1 }}
        placeholder={'说点什么吧...'}
      />
      <View>
        <FormImage
          imgs={imgs}
          onCloseable={(index) =>
            setImgs((draft) => {
              draft.splice(index, 1)
            })
          }
        />
      </View>
    </View>
  )
}
