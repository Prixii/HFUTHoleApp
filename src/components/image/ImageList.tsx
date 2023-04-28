import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { Modal, View } from 'react-native'
import { ZoomImage } from '@/components/image/ZoomImage'
import { ImageListItem } from '@/components/image/ImageListItem'

export const ImageList: React.FC<{
  imgs?: string[]
}> = ({ imgs }) => {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  const open = () => {
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
  }

  return (
    <View>
      {imgs?.length ? (
        <View>
          <Modal visible={visible} transparent={true} onRequestClose={close}>
            <ZoomImage
              imageUrls={imgs?.map((img) => ({ url: img }))}
              index={index}
              close={close}
            />
          </Modal>
          <View className={'space-y-2 grid'}>
            <View className={'flex flex-row space-x-2'}>
              {imgs?.slice(0, 2).map((img, index) => (
                // TODO 我也不想这么做的，但rn的flex布局似乎不同于网页，我实在是没什么好思路了，欢迎PR
                <ImageListItem
                  img={img}
                  i={index}
                  key={index}
                  length={imgs?.length}
                  index={index}
                  open={open}
                  setIndex={setIndex}
                />
              ))}
            </View>
            <View className={'flex flex-row mt-2'}>
              {imgs?.slice(2, 4).map((img, index) => (
                <ImageListItem
                  img={img}
                  i={index + 2}
                  key={index + 2}
                  length={imgs?.length}
                  index={index}
                  open={open}
                  setIndex={setIndex}
                />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}
