import { Image, View } from 'react-native'
import { Closeable } from '@/components/Closeable'
import { ImagePickerResult } from 'expo-image-picker'

interface Props {
  imgs: ImagePickerResult['assets']
  onCloseable: (index: number) => void
}

export function FormImage(props: Props) {
  return (
    <View className={'flex flex-row space-x-2'}>
      {props.imgs.map((img, index) => (
        <View>
          <Image
            source={{ uri: img.uri }}
            resizeMode={'cover'}
            className={'w-20 h-20 rounded-lg'}
          />
          <Closeable onPress={() => props.onCloseable(index)} />
        </View>
      ))}
    </View>
  )
}
