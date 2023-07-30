import * as ImagePicker from 'expo-image-picker'
import { AwaitAble } from '@/shared/types'
import { Toast } from '@/shared/utils/toast'

interface Options extends ImagePicker.ImagePickerOptions {
  onSuccess: (data: ImagePicker.ImagePickerResult) => AwaitAble<void>
  onError?: (data: ImagePicker.ImagePickerErrorResult) => AwaitAble<void>
}

export function useImagePicker({ onSuccess, onError, ...options }: Options) {
  const onImageSelect = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        selectionLimit: 4,
        quality: 0.8,
        ...options,
      })

      if (!result.canceled) {
        onSuccess(result)
      }
    } catch (err) {
      if (!onError) {
        Toast.error({
          text1: '图片选择失败了',
        })
        return
      }

      onError(err as ImagePicker.ImagePickerErrorResult)
    }
  }

  return {
    onImageSelect,
  }
}
