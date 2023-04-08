import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import React from 'react'
import { HolePostAddTags } from '@/pages/hole/post/tags'
import * as ImagePicker from 'expo-image-picker'
import { useHolePostContext } from '@/shared/context/hole'
import { Toast } from '@/shared/utils/toast'

export function BottomActions() {
  const {
    imgs,
    setImgs,
    form: { setValue },
  } = useHolePostContext()

  const onSelectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        selectionLimit: 4,
        quality: 0.6,
      })

      if (!result.canceled) {
        setImgs((draft) => {
          for (const assets of result.assets) {
            if (draft.length >= 4) {
              Toast.error({ text1: '最多只能选4张图片哦' })
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

  return (
    <>
      <View className={'flex flex-row justify-between items-center'}>
        <HolePostAddTags />
        <View className={'flex flex-row'}>
          <IconButton icon={'camera'} onPress={onSelectImage} />
          {/*<IconButton icon={'plus'} />*/}
        </View>
      </View>
    </>
  )
}
