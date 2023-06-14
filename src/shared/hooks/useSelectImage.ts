import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Toast } from '@/shared/utils/toast'
import { useImmer } from 'use-immer'
import { ImagePickerResult } from 'expo-image-picker'

export function useSelectImage(options: ImagePicker.ImagePickerOptions) {
  const [imgs, setImgs] = useImmer<ImagePickerResult['assets']>([])

  const onSelectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        selectionLimit: 3,
        quality: 0.9,
        ...options,
      })

      if (!result.canceled) {
        setImgs((draft) => {
          for (const assets of result.assets) {
            if (draft.length >= options.selectionLimit) {
              Toast.error({
                text1: `最多只能选${options.selectionLimit}张图片哦`,
              })
              return
            }
            draft.push(assets)
          }
        })
      }
    } catch (err) {
      Toast.error({ text1: '图片选择失败' })
    }
  }

  return {
    imgs,
    setImgs,
    onSelectImage,
  }
}
