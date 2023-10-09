import { View, Image, Modal, Pressable } from 'react-native'
import { ZoomImage } from '@/components/image/ZoomImage'
import { useTheme } from 'react-native-paper'
import { useCallback, useState } from 'react'

const imageList = [
  {
    url: '',
    props: {
      source: require('./2023-2024-hf.jpg'),
    },
  },
  {
    url: '',
    props: {
      source: require('./2023-2024-xc.jpg'),
    },
  },
]

export const SchoolCalendarScreen = () => {
  const theme = useTheme()
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <View className="flex-1 p-6 bg-white">
      <Modal visible={visible} transparent={true} onRequestClose={close}>
        <ZoomImage imageUrls={imageList} index={index} close={close} />
      </Modal>
      <View className="flex space-y-4">
        {imageList.map((image, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setIndex(index)
              open()
            }}
          >
            <Image
              className="mx-auto max-w-full w-[318px] h-[225px] rounded-lg"
              source={image.props.source}
              style={{
                resizeMode: 'cover',
                backgroundColor: theme.colors.onBackground,
              }}
            />
          </Pressable>
        ))}
      </View>
    </View>
  )
}
